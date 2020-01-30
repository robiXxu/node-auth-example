const bcrypt = require('bcryptjs');
const saltValue = 11;

const generatePassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(saltValue);
  return await bcrypt.hash(plainTextPassword, salt);
}

module.exports = {
  generatePassword
};
