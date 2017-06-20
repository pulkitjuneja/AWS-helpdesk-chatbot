const lexHelper = require('../helpers/lexHelper.js')
const cVs = require('../helpers/commonValidations');

handler = (event, context, callback) => {
  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;
  const date = event.currentIntent.slots.date;

  if (source === 'DialogCodeHook') {
    const validationres = validateData(mnemonic, company, date);
    if (!validationres.isValid) {
      callback(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, validationres.violatedSlot, validationres.message));
      return;
    }

    const sessionAtrtibutes = event.currentIntent.sessionAtrtibutes || {} ;
    callback(null,lexHelper.delegate(sessionAtrtibutes,event.currentIntent.slots));
  }
  else {
    const link = `http://localhost:3000/showdata?mnemonic=${mnemonic}&company=${company}&date=${date}`;
    const fulFillMessage = `you can find the required information at ${link}`;
    callback(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
  }
}

validateData = (mnemonic, company, date) => {
  if(!mnemonic) {
    return lexHelper.buildValidationResult(false, "mnemonic", `please enter the mnemonic for which the data is required`);
  }
  if (!cVs.valdateMnemonic(mnemonic)) {
    return lexHelper.buildValidationResult(false, "mnemonic", `Sorry, we do not support the mnemonic type ${mnemonic}`)
  }
  if(!company) {
    return lexHelper.buildValidationResult(false, "company", `please enter the company for which the data is required`);
  }
  if (!cVs.validateComapny(company)) {
    return lexHelper.buildValidationResult(false, "company", `Sorry, we do not have data about ${company}`);
  }
  return lexHelper.buildValidationResult(true, null, null);
}

module.exports = {
  handler
}