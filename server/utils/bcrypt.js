require('dotenv').config();

const bcrypt = require('bcrypt');

const Bcrypt = {
  rounds: Number(process.env.ROUNDS) || 9,
  hash(password) {
    return bcrypt.hash(password, this.rounds);
  },
  compare(password, hash) {
    return bcrypt.compare(password, hash);
  },
};

console.log('----------',Bcrypt);
module.exports = Bcrypt;