const fs = require('fs'); 
const lexHelper = require('./lexHelper');


valdateMnemonic = (mnemonic) => {
  const mnemonics = JSON.parse(fs.readFileSync('../models/mnemonics.json')).mnemonics;
  var found = mnemonics.some((element)=>{
    return element.name === mnemonic.toLowerCase();
  });
  return found;
}

validateComapny = (company) => {
  const comapnies = JSON.parse(fs.readFileSync('../model/companies.json')).companies;
  var found = companies.some((element)=>{
    return element.name === cpmany.toLowerCase();
  });
  return found;
}

module.exports = {
  validateComapny,
  valdateMnemonic
}