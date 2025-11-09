const {Buffer} = require('buffer');

// Create a buffer from a string
const buf1 = Buffer.from('Hello, World!', 'utf8');
console.log('Buffer from string:', buf1.toString());