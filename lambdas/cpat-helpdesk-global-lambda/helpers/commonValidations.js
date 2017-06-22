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

validateDeck = (deck) => {
  const decks = JSON.parse(fs.readFileSync('./models/decks.json')).decks;
  var found = decks.some((element)=>{
    return element.toLowerCase() === deck.toLowerCase();
  })
  return found;
}

module.exports = {
  validateComapny,
  validateDeck,
  valdateMnemonic
}