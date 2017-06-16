const pgQuery = require('pg-query')
const lexHelper = require('./helpers/lexHelper')

pgQuery.connectionParameters = 'postgres://cpatdev:password123@helpdesk-datastore.cdxpes6le825.us-east-1.rds.amazonaws.com:5432/helpdesk_datastore';

handler = (event, context, cb) => {

  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;

  if (source === 'DialogCodeHook') {

    validateMnemonicNative(mnemonic).then((rows, res) => {
      cb(null, rows);
    })


  }
  else {
    const fulFillMessage = `Answering ${mnemonic} for ${company} during the years ${event.currentIntent.slots.date}`;
    cb(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
    return;
  }
}



/* ---- validation functions  ---- */


validateMnemonicNative = (mnemonic) => {
  return pgQuery("SELECT * FROM mnemonics");
}

validateMnemonic = (mnemonic) => {
  return dbHelper.fetchMnemonics().then((response) => {
    var found = response.some((elem) => {
      return elem.name = mnemonic;
    });
    return lexHelper.buildValidationResult(found, 'mnemonic', found ? null : `we do not support the mnemonic type ${mnemonic}`)
  });
}

validateCompany = (company) => {
  return dbHelper.fetchCompanies().then((response) => {
    var found = response.some((elem) => {
      return elem.name = company;
    });
    return lexHelper.buildValidationResult(found, 'company', `sorry we current do not have data from ${company}`)
  })
}

/* ------------------------------- */

module.exports = {
  handler
}