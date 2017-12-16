const hmac = require('hmac');

const testHash = (text) => {
    console.log('Initial value: ', text);
    const hmac = hmac.createHmac('sha256', 'a super secret');
    hmac.update(text);

    const hmac2 = hmac.createHmac('sha256', 'a super secret');
    hmac2.update(text);

    const hash = hmac.digest('hex');
    const hash2 = hmac2.digest('hex');

    console.log('Hashed value: ', hash);
    console.log('Hashed value: ', hash2);

    console.log('Comparision result: ', hash === hash2);
}

module.exports = {
    testHash
};