const bcrypt = require('bcrypt');

const rounds = 10;
async function run() {
    const salt = await bcrypt.genSalt(rounds);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(hashed);
}
run();