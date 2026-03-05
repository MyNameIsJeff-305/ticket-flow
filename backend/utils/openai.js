const openaiApiKey = require('../config').openaiApiKey;
const { OpenAI } = require('openai');

async function getTitleAndDescription(transcription, anonymous = false) {
    if (transcription === null || transcription.length === 0) {
        return { title: 'Missed Call', description: 'No transcription available for this call due to missing or incomplete data. Please, contact as soon as possible.' };
    }

    const client = new OpenAI({ apiKey: openaiApiKey });

    const anonymousPrompt = anonymous ? " Prefix 'Unknown Caller' in title and add a note at the end of description that clarifies the caller is unknown. " : "";

    try {
        const response = await client.responses.create({
            model: "gpt-5",
            input: [
                {
                    role: "user",
                    content: "Task: Based on the following conversation transcription, write: 1.⁠ ⁠'title': a short, clear issue title in English only (maximum 50 characters). 2.⁠ 'description': a detailed, factual summary in English only (maximum 100 words) explaining the customer's problem, actions taken, results, and any pending tasks. Output rules: ⁠Respond ONLY with valid JSON formatted exactly as: {'title': '...','description': '...'} ⁠Use double quotes for all keys and values. ⁠Do not include explanations, markdown, or any text outside the JSON. ⁠Preserve technical names, error codes, IPs, and software terms exactly as mentioned. Ignore any Spanish or other non-English text in the transcription; translate to English where needed. ⁠Keep tone professional, concise, and suitable for CRM ticket entry." + anonymousPrompt + " This is the transcription text: " + transcription,
                },
            ],
        });

        console.info('getTitleAndDescription:\n' + response.output_text);

        const { title, description } = JSON.parse(response.output_text);
        return { title, description };
    } catch (error) {
        console.error('Error parsing OpenAI response:', error);
    }

    return { title: '', description: '' };
}

async function getTranscriptionFromRecording(file) {
    const client = new OpenAI({ apiKey: openaiApiKey });

    // const audioUrl = recordingUrl.replace(/\.[^/.]+$/, '') + '.mp3';
    // console.info('getTranscriptionFromRecording - audioUrl: ' + audioUrl);

    let transcription = null;

    try {
        const response = await client.audio.transcriptions.create({
            file: file,
            model: "gpt-4o-transcribe",
            response_format: "text",
            prompt: "Here is an audio file. All my audio files are IT support calls where a client reports a technical issue and a help-desk technician provides troubleshooting. Please transcribe the call verbatim with proper punctuation, and label the speakers as Client and Technician. Automatically detect the language spoken in the audio and provide the transcript in that same language, whether it is English, Spanish, or Spanglish. Add timestamps every 30 seconds and mark unclear audio with ‘[inaudible]’. After the transcript, provide a concise help-desk analysis that includes: 1) the main issue reported by the client, 2) the probable root cause, 3) the troubleshooting steps taken during the call, and 4) recommended next steps or follow-up actions. Do not summarize the transcript itself—only provide the analysis after the full transcript.",
        });

        console.info('getTranscriptionFromRecording:\n' + JSON.stringify(response));

        transcription = response;
    }
    catch (error) {
        console.error('Error getting transcription from recording:', error);
        return null;
    }

    return transcription;
}

module.exports = { getTitleAndDescription, getTranscriptionFromRecording };