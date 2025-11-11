const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const config = require('@config/twilio');
const env = require('../../../config').environment;
const urlencodedParser = express.urlencoded({ extended: true });
const {
    upsertCallAndTicket,
    insertTranscription,
    updateTicketWithTranscription,
    upsertCallRecording,
    getCompletedTranscriptions,
    getAudioFileFromUrl,
} = require('../../../utils/twilio');

const { getTranscriptionFromRecording } = require('../../../utils/openai');

const { singleFileUpload } = require('../../../awsS3');

const publicWebhookPaths = [
    '/api/integrations/twilio/callStart',
    '/api/integrations/twilio/callStatus',
    '/api/integrations/twilio/recordingStatus',
    '/api/integrations/twilio/transcription',
];

router.post('/callStart', urlencodedParser, async (req, res) => {
    // const result = await upsertCallAndTicket(req);
    await upsertCallAndTicket(req);

    const twiml = new twilio.twiml.VoiceResponse();
    const pbx = config.pbxNumber;
    const protocol = env === 'production' ? 'https' : 'http';
    // const urlTranscriptions = protocol + '://' + req.get('host') + '/api/integrations/twilio/transcription';
    const urlRecordings = protocol + '://' + req.get('host') + '/api/integrations/twilio/recordingStatus';

    // twiml.start().transcription({
    //     statusCallbackUrl: urlTranscriptions,
    // });
    
    twiml.dial({
        record: 'record-from-answer',
        recordingStatusCallback: urlRecordings,
        recordingStatusCallbackMethod: 'POST',
    }, pbx);

    twiml.say(config.answerMessage);

    twiml.record({
        recordingStatusCallback: urlRecordings,
        recordingStatusCallbackMethod: 'POST'
    });

    res.type('text/xml');
    return res.send(twiml.toString());
});

router.post('/callStatus', urlencodedParser, async (req, res) => {
    // if (CallStatus !== 'completed') return res.sendStatus(200);

    // const result = await upsertCallAndTicket(req);
    await upsertCallAndTicket(req);

    return res.sendStatus(200);
});

router.post('/recordingStatus', urlencodedParser, async (req, res) => {
    console.info(JSON.stringify(req.body));

    const result = await upsertCallRecording(req);
    if (!result) {
        console.error('Failed to upsert call recording');
        return res.sendStatus(500);
    }

    const { CallSid, RecordingStatus, RecordingUrl } = req.body;

    if (RecordingStatus === 'completed') {
        try {
            const { file, stream } = await getAudioFileFromUrl(RecordingUrl.replace(/\.[^/.]+$/, '') + '.mp3', 'audio/mpeg');
            const s3url = await singleFileUpload({ file, public: true });
            console.info('Recording uploaded to S3 URL: ' + s3url);

            const { recording } = result;
            const transcription = await getTranscriptionFromRecording(stream);
            await recording.update({ transcription });

            await updateTicketWithTranscription(CallSid, transcription);
        } catch (error) {
            console.error(error);
            return res.sendStatus(500);
        }
    }

    return res.sendStatus(200);
});

// TODO: remove this if openai handler is working fine
router.post('/transcription', urlencodedParser, async (req, res) => {
    console.info(JSON.stringify(req.body));

    const {
        // TranscriptionSid,
        TranscriptionEvent,
        CallSid,
        // Timestamp,
        // AccountSid,
        // SequenceId,
        // Track,
        // Final,
        // TranscriptionData,
    } = req.body;

    // if (TranscriptionEvent === 'transcription-content' && TranscriptionData) {}
    // else if (TranscriptionEvent === 'transcription-stopped') {// }

    // const result = await insertTranscription(req);
    await insertTranscription(req);

    if (TranscriptionEvent === 'transcription-stopped') {
        const transcription = await getCompletedTranscriptions(CallSid);
        await updateTicketWithTranscription(CallSid, transcription);
    }

    return res.sendStatus(200);
});

module.exports = { router, publicWebhookPaths };