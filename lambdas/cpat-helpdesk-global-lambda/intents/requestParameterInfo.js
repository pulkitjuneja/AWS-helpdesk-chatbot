const lexHelper = require('../helpers/lexHelper.js')
const cVs = require('../helpers/commonValidations');

handler = (event, context, callback) => {
  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;

  if (source === 'DialogCodeHook') {
    const validationres = validateData(mnemonic, company, date);
    if (!validationres.isValid) {
      callback(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, validationres.violatedSlot, validationres.message));
    }
  }
  else {
    const fulFillMessage = `Answering ${mnemonic} for ${company} during the years ${event.currentIntent.slots.date}`;
    callback(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
  }
}

validateData = (mnemonic, company, date) => {
  if (!cVs.valdateMnemonic(mnemonic)) {
    return lexHelper.buildValidationResult(false, "mnemonic", `Sorry, we do not support the mnemonic type ${mnemonic}`)
  }
  if (!cVs.validateComapny(company)) {
    return lexHelper.buildValidationResult(false, "company", `Sorry, we do not have data about ${company}`);
  }
  return lexHelper.buildValidationResult(true, null, null);
}


module.exports = {
  handler
}