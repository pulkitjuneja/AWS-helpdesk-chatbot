const fs = require('fs');
const lexHelper = require('./lexHelper');


valdateMnemonic = (mnemonic) => {
  const mnemonics = JSON.parse(fs.readFileSync('./models/mnemonics.json')).mnemonics;
  var found = mnemonics.some((element) => {
    return element === mnemonic.toLowerCase();
  });
  return found;
}

validateComapny = (company) => {
  const companies = JSON.parse(fs.readFileSync('./models/companies.json')).companies;
  var found = companies.some((element) => {
    return element === company.toLowerCase();
  });
  return found;
}

module.exports = {
  validateComapny,
  valdateMnemonic
}