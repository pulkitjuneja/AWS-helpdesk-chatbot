const lexHelper = require('./helpers/lexHelper.js')

const mnemonics = [
  'ROIC'
]

const companies = [
  'IBM'
]

handler = (event, context, callback) => {
  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;

  if (source === 'DialogCodeHook') {
    const res = validateMnemonic(mnemonic);
    if (!res.isValid) {
      callback(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, res.violatedSlot, res.message));
    }
  }
  else {
    const fulFillMessage = `Answering ${mnemonic} for ${company} during the years ${event.currentIntent.slots.date}`;
    callback(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
  }
}


const validateMnemonic = (mnemonic) => {
  const found = mnemonics.some((elem) => {
    return elem.name == mnemonic
  });
  return lexHelper.buildValidationResult(found, 'mnemonic', found ? null : `we do not support the mnemonic type ${mnemonic}`);
}

module.exports = {
  handler
}