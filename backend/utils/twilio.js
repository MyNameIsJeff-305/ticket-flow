const { Client, Ticket, TwilioTranscription, TwilioCall, TwilioRecording, Location, LocationPhoneNumber } = require('@db/models');
const sq = require('../db/models').sequelize;
const generateAlphanumericId = require('./randomGenerator');
const twilioConfig = require('../config/twilio');
const { Op } = require('sequelize');
const { getTitleAndDescription } = require('./openai');
const axios = require('axios');
const { Buffer } = require('buffer');
const fs = require('fs');

async function upsertCallAndTicket(req) {
    const {
        Called,
        CallSid,
        To,
        CallStatus,
        From,
        CallDuration,
        AccountSid,
        ApplicationSid,
        Caller,
    } = req.body;

    const clientPhone = From || Caller;

    // 1️⃣ Evita procesar una llamada ya registrada
    const existingCall = await TwilioCall.findOne({ where: { callSid: CallSid } });
    if (existingCall) {
        await existingCall.update({
            callStatus: CallStatus || existingCall.callStatus,
            callDuration: CallDuration || existingCall.callDuration,
        });
        return { success: true, created: false, anonymous: null };
    }

    let clientByPhone = null;

    try {
        // 2️⃣ Búsqueda directa en tabla Clients
        clientByPhone = await Client.findOne({ where: { phone: clientPhone } });


        // 3️⃣ Si no existe, buscar en LocationPhoneNumbers
        if (!clientByPhone) {
            const locationPhone = await LocationPhoneNumber.findOne({
                where: { phoneNumber: clientPhone },
                include: {
                    model: Location,
                    attributes: ['id', 'clientId'],
                },
            });

            if (locationPhone && locationPhone.Location) {
                clientByPhone = await Client.findByPk(locationPhone.Location.clientId);
                console.info(`✅ Found client ${clientByPhone.id} via location phone ${clientPhone}`);
            }
        }

        // 4️⃣ Si sigue sin encontrarse, usar cliente anónimo
        if (!clientByPhone) {
            console.warn(`⚠️ Client not found for ${clientPhone}, using anonymous`);
            clientByPhone = await Client.findByPk(twilioConfig.anonymousClientId);
        }

        if (!clientByPhone) throw new Error('Anonymous client not found');

        // 5️⃣ Previene duplicados de LocationPhoneNumbers
        if (clientByPhone.id !== twilioConfig.anonymousClientId) {
            const clientLocations = await Location.findAll({
                where: { clientId: clientByPhone.id },
            });

            if (clientLocations.length > 0) {
                const exists = await LocationPhoneNumber.findOne({
                    where: { phoneNumber: clientPhone },
                });

                // Si no existe en ninguna locación, lo asignamos a la primera
                if (!exists) {
                    await LocationPhoneNumber.create({
                        phoneType: 'Office',
                        locationId: clientLocations[0].id,
                        phoneNumber: clientPhone,
                    });
                    console.info(`📞 Linked ${clientPhone} to location ${clientLocations[0].id}`);
                }
            }
        }

        // 6️⃣ Crear ticket y llamada dentro de transacción
        await sq.transaction(async (t) => {
            const ticket = await Ticket.create(
                {
                    title: '',
                    description: '',
                    checkIn: null,
                    checkOut: null,
                    clientId: clientByPhone.id,
                    statusId: 1,
                    hashedId: generateAlphanumericId(10),
                    createdBy: twilioConfig.autoUserId,
                },
                { transaction: t }
            );

            await TwilioCall.create(
                {
                    ticketId: ticket.id,
                    called: Called,
                    callSid: CallSid,
                    to: To,
                    callStatus: CallStatus,
                    from: From,
                    callDuration: CallDuration || 0,
                    accountSid: AccountSid,
                    applicationSid: ApplicationSid,
                    caller: Caller,
                },
                { transaction: t }
            );
        });

        return {
            success: true,
            created: true,
            anonymous: clientByPhone.id === twilioConfig.anonymousClientId,
        };
    } catch (error) {
        console.error('❌ Error in upsertCallAndTicket:', error);
        return { success: false, created: null, anonymous: null };
    }
}


async function insertTranscription(req) {
    const {
        TranscriptionSid,
        TranscriptionEvent,
        CallSid,
        Timestamp,
        AccountSid,
        SequenceId,
        Final,
        TranscriptionData,
        Track,
    } = req.body;

    const call = await TwilioCall.findOne({ where: { callSid: CallSid } });

    if (!call) {
        console.error(`Call with SID ${CallSid} not found`);
        return false;
    }

    try {
        await TwilioTranscription.create({
            callId: call.id,
            transcriptionSid: TranscriptionSid,
            callSid: CallSid,
            accountSid: AccountSid,
            timestamp: Timestamp,
            transcriptionEvent: TranscriptionEvent,
            sequenceId: Number(SequenceId) || 0,
            transcriptionData: TranscriptionData || '',
            track: Track || null,
            final: Final === 'true' ? true : false,
        });
    }
    catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

async function getCompletedTranscriptions(callSid) {
    const transcriptions = await TwilioTranscription.findAll({
        where: {
            callSid: callSid,
            transcriptionData: {
                [Op.and]: [
                    { [Op.ne]: null },
                    { [Op.ne]: '' }
                ]
            },
        },
        order: [['sequenceId', 'ASC']],
    });

    if (transcriptions.length === 0) {
        console.info('No transcriptions found for callSid: ' + callSid);
        return null;
    }

    const completed = transcriptions.reduce((acc, curr) => {
        return `${acc}${curr.track}:${curr.transcriptionData}\n`;
    });

    console.info('getCompletedTranscriptions:\n' + completed);

    return completed.trim();
}

async function updateTicketWithTranscription(callSid, transcription) {
    const call = await TwilioCall.findOne({ where: { callSid: callSid } });

    if (!call) {
        console.error(`Call with SID ${callSid} not found`);
        return false;
    }

    const ticket = await Ticket.findOne({ where: { id: call.ticketId } });

    if (!ticket) {
        console.error(`Ticket with ID ${call.ticketId} not found`);
        return false;
    }

    const anonymous = ticket.clientId === twilioConfig.anonymousClientId;
    const { title, description } = await getTitleAndDescription(transcription, anonymous);

    try {
        await ticket.update({
            title: title.slice(0, 50) || 'No Title',
            description: description || 'No Description',
        });
    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}

async function upsertCallRecording(req) {
    const {
        AccountSid,
        CallSid,
        RecordingSid,
        RecordingUrl,
        RecordingStatus,
        RecordingDuration,
        RecordingStartTime,
        RecordingChannels,
        RecordingSource,
    } = req.body;

    const existingRecording = await TwilioRecording.findOne({ where: { recordingSid: RecordingSid } });

    let result = null;

    if (existingRecording) {
        try {
            result = await existingRecording.update({
                recordingUrl: RecordingUrl || existingRecording.recordingUrl,
                recordingStatus: RecordingStatus || existingRecording.recordingStatus,
                recordingStartTime: RecordingStartTime || existingRecording.recordingStartTime,
                recordingDuration: Number(RecordingDuration) || existingRecording.recordingDuration,
                recordingChannels: RecordingChannels || existingRecording.recordingChannels,
                recordingSource: RecordingSource || existingRecording.recordingSource,
            });
        }
        catch (error) {
            console.error(error);
            return false;
        }

        return { recording: result, created: false };
    }

    const call = await TwilioCall.findOne({ where: { callSid: CallSid } });

    if (!call) {
        console.error(`Call with SID ${CallSid} not found`);
        return false;
    }

    try {
        result = await TwilioRecording.create({
            callId: call.id,
            recordingSid: RecordingSid,
            callSid: CallSid,
            accountSid: AccountSid,
            recordingUrl: RecordingUrl,
            recordingStatus: RecordingStatus,
            recordingStartTime: RecordingStartTime,
            recordingDuration: Number(RecordingDuration),
            recordingChannels: RecordingChannels,
            recordingSource: RecordingSource,
        });
    }
    catch (error) {
        console.error(error);
        return false;
    }

    return { recording: result, created: true };
}

async function getAudioFileFromUrl(url, mimeType) {
    const extension = url.split('.').pop().split('?')[0];
    const filename = generateAlphanumericId(10) + '.' + extension;
    const tempDir = '../media/temp_recordings';
    const filePath = tempDir + '/' + filename;

    try {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const res = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(res.data);

        fs.writeFileSync(filePath, buffer);
        const stream = fs.createReadStream(filePath);

        const file = {
            originalname: filename,
            buffer: buffer,
            mimetype: mimeType,
        };

        console.info('Fetched audio file from URL and saved to disk:\n' + JSON.stringify({
            originalname: filename,
            mimetype: mimeType,
            buffer: String(buffer).slice(0, 20) + '...'
        }));

        return { file, stream };
    } catch (error) {
        console.error('Error fetching audio file from URL:', error);
    }

    return null;
}

module.exports = {
    upsertCallAndTicket,
    insertTranscription,
    getCompletedTranscriptions,
    updateTicketWithTranscription,
    upsertCallRecording,
    getAudioFileFromUrl,
};