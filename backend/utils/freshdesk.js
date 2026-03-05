const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

async function uploadAttachmentToFreshservice(ticketId, filePath, fileName) {
    const authString = Buffer.from(`${process.env.FRESHDESK_API_KEY}:X`).toString("base64");

    const form = new FormData();
    form.append("attachments[]", fs.createReadStream(filePath), `Call Recording - ${fileName}`);
    form.append("priority", 1); // FS requires at least 1 normal field

    const response = await axios.put(
        `${process.env.FRESHDESK_URL}/api/v2/tickets/${ticketId}`,
        form,
        {
            headers: {
                "Authorization": `Basic ${authString}`,
                ...form.getHeaders(),
            }
        }
    );

    console.log("Freshservice Upload Success:", response.status);

    return true;
}

module.exports = { uploadAttachmentToFreshservice };
