const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const fs = require('fs');

const hash = (text) => {
    const hash = bcrypt.hashSync(text, 10);
    console.log('Hashed value: ', hash);
}

const compare = (text, hash) => {
    const comparision = bcrypt.compareSync(text, hash); // true
    console.log('Comparision result: ', comparision);
}

const testHash = (text) => {
    console.log('Initial value: ', text);

    const hash = bcrypt.hashSync(text, 10);
    console.log('Hashed value: ', hash);

    const comparision = bcrypt.compareSync(text, hash); // true
    console.log('Comparision result: ', comparision);
}

module.exports = {
    hash,
    compare,
    testHash
};