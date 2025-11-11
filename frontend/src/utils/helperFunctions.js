//Function that takes a phone number string in the way "+12345678901" and formats it to (234) 567-8901
export function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

//Function to try to format a number to (xxx) xxx-xxxx, if not possible return the original string
export function tryFormatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

//Function to format a (xxx) xxx-xxxx phone number to +1xxxxxxxxxx
export function unformatPhoneNumber(formattedPhoneNumber) {
    const cleaned = ('' + formattedPhoneNumber).replace(/\D/g, '');
    if (cleaned.length === 10) {
        return '+1' + cleaned;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return '+' + cleaned;
    }
    return formattedPhoneNumber; // Return original if it doesn't match expected lengths
}