const inquirer = require('inquirer');
const chalk = require('chalk');

const AES = require('./types/aes');
const RSA = require('./types/rsa');
const BCRYPT = require('./types/bcrypt');

const log = console.log;

inquirer
    .prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What do you want to do?',
            choices: [
                {
                    name: 'Test encryption mechanism',
                    value: 'test',
                },
                {
                    name: 'Encrypt some text',
                    value: 'encrypt'
                },
                {
                    name: 'Decrypt some text',
                    value: 'decrypt'
                },
                {
                    name: 'Compare hash',
                    value: 'hash'
                },
                {
                    name: 'Test all encryption mechanisms',
                    value: 'test-all'
                }
            ]
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type do you need',
            choices: ['AES', 'RSA', 'BCRYPT'],
            filter: (val) => val.toLowerCase(),
            when: (answers) => {
                return (answers.operation !== 'test-all' && answers.operation !== 'hash')
            }
        },
        {
            type: 'list',
            name: 'type',
            message: 'What type do you need',
            choices: ['BCRYPT'],
            filter: (val) => val.toLowerCase(),
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to test',
            when: (answers) => {
                return (answers.operation === 'test' && answers.type !== 'aes')
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to test',
            when: (answers) => {
                return ((answers.operation === 'test' && answers.type === 'aes') || answers.operation === 'test-all')
            },
            validate: (value) => {
                return value.length % 16 === 0 || 'String must have 16 chars length';
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to compare',
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'hash',
            message: 'Type hash to test',
            when: (answers) => {
                return answers.operation === 'hash'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to encrypt',
            when: (answers) => {
                return answers.operation === 'encrypt' && answers.type !== 'aes'
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type text to encrypt',
            when: (answers) => {
                return answers.operation === 'encrypt' && answers.type === 'aes'
            },
            validate: (value) => {
                return value.length % 16 === 0 || 'String must have 16 chars length';
            }
        },
        {
            type: 'input',
            name: 'text',
            message: 'Type encrypted value',
            when: (answers) => {
                return answers.operation === 'decrypt'
            }
        }
    ])
    .then(answers => {
        const { text, operation, type } = answers;
        try {
            switch (operation) {
                case 'test':
                    switch (type) {
                        case 'aes':
                            AES.testCrypt(text)
                            break;
                        case 'rsa':
                            RSA.testCrypt(text)
                            break;
                        case 'bcrypt':
                            BCRYPT.testHash(text);
                            break;
                    }
                    break;
                case 'encrypt':
                    switch (type) {
                        case 'aes':
                            AES.encrypt(text);
                            break;
                        case 'rsa':
                            RSA.encrypt(text);
                            break;
                        case 'bcrypt': 
                            BCRYPT.hash(text);
                            break;
                    }
                    break;
                case 'decrypt':
                    switch (type) {
                        case 'aes':
                            AES.decrypt(text);
                            break;
                        case 'rsa':
                            RSA.decrypt(text);
                            break;
                        case 'bcrypt':
                            console.log(chalk.red('Hash function cannot be decrypted'))
                    }
                    break;
                case 'hash':
                    switch (type) {
                        case 'bcrypt':
                            BCRYPT.compare(text, answers.hash)
                            break;
                    }
                    break;
                case 'test-all':
                    console.log(chalk.blue('AES'))
                    console.time('AES time');
                    AES.testCrypt(text);
                    console.timeEnd('AES time');
                    console.log('\n');
                    console.log(chalk.blue('RSA'))
                    console.time('RSA time');
                    RSA.testCrypt(text);
                    console.timeEnd('RSA time');
                    console.log('\n');
                    console.log(chalk.blue('BCRYPT'))
                    console.time('BCRYPT time');
                    BCRYPT.testHash(text);
                    console.timeEnd('BCRYPT time');
                    break;
            }
        } catch (err) {
            console.error(chalk.red(err));
        }

        log(chalk.green(`Operation completed`));
    });