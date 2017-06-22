const lexHelper = require('../helpers/lexHelper');
const cVs = require('../helpers/commonValidations.js');


handler = (event, context, callback) => {
  const source = event.invocationSource;
  const deckName = event.currentIntent.slots.deck;
  if (source === 'DialogCodeHook') {
    const validationres = validateData(deckName);
    if (!validationres.isValid) {
      callback(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, validationres.violatedSlot, validationres.message));
      return;
    }
    const sessionAtrtibutes = event.sessionAtrtibutes || {};
    callback(null, lexHelper.delegate(sessionAtrtibutes, event.currentIntent.slots));
  }
  else {
    const link = `http://localhost:3000/showdata?deckName=${deckName}`;
    callback(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', `you can find the required deck at ${link}`));
    return;
  }
}

validateData = (deck) => {
  if(!deck) {
    return lexHelper.buildValidationResult(false,'deck', `please provide a value for deck type`);
  }
  if (!cVs.validateDeck(deck)) {
    return lexHelper.buildValidationResult(false, 'deck', `${deck}is an invalid deck type`);
  }
  return lexHelper.buildValidationResult(true, null, null);
}

module.exports = {
  handler
}