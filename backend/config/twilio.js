const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

module.exports = {
    pbxNumber: process.env.TWILIO_PBX_NUMBER,
    answerMessage: process.env.TWILIO_ANSWER_MESSAGE,
    autoUserId: process.env.TWILIO_AUTO_USER_ID,
    autoUserPassword: process.env.TWILIO_AUTO_USER_PASSWORD,
    anonymousClientId: process.env.TWILIO_ANONYMOUS_CLIENT_ID,
    accountSid,
    authToken,
    client,
};