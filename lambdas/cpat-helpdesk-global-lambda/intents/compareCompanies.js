const lexHelper = require('../helpers/lexHelper');
const cVs = require('../helpers/commonValidations');

handler = (event, context, callback) => {
    const source = event.invocationSource;
    const companyA = event.currentIntent.slots.companyA;
    const companyB = event.currentIntent.slots.companyB;

    if (source === 'DialogCodeHook') {
        const validationres = validateCompanies(companyA, companyB);
        if (!validationres.isValid) {
            callback(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, validationres.violatedSlot, validationres.message));
            return;
        }
        const sessionAtrtibutes = event.currentIntent.sessionAtrtibutes || {};
        callback(null, lexHelper.delegate(sessionAtrtibutes, event.currentIntent.slots));
    }
    else {
        const message = `answering comparision for ${companyA} and ${companyB}`
        callback(null,lexHelper.close(event.sessionAttributes, 'Fulfilled', message));
        return;
    }
}

validateCompanies = (companyA, companyB) => {
    if (!cVs.validateComapny(companyA)) {
        return lexHelper.buildValidationResult(false, 'companyA', `Sorry, we do not have data about ${companyA}`)
    }
    if(!companyB) {
        return lexHelper.buildValidationResult(false,'companyB',`enter second company for comparision`);
    }
    if (!cVs.validateComapny(companyB)) {
        return lexHelper.buildValidationResult(false, 'companyB', `Sorry, we do not have data about ${companyB}`)
    }
    return lexHelper.buildValidationResult(true, null, null);
}

module.exports = {
    handler
}