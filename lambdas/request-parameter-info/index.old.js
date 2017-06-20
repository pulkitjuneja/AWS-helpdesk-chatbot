const pgQuery = require('pg-query')
const lexHelper = require('./helpers/lexHelper')

pgQuery.connectionParameters = 'postgres://cpatdev:password123@helpdesk-datastore.cdxpes6le825.us-east-1.rds.amazonaws.com:5432/helpdesk_datastore';

handler = (event, context, cb) => {

  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;

  if (source === 'DialogCodeHook') {

    console.log("here");
    validateMnemonicNative(mnemonic).then((response) => {
      console.log(response);
        if (!response.isValid) {
          const finalOut = lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, response.violatedSlot, response.message);
          console.log(finalOut);
          cb(null,finalOut);
        }
    }).catch((err)=>{
      console.log('inside error');
      console.log(err);
    });
  }

  else {
    const fulFillMessage = `Answering ${mnemonic} for ${company} during the years ${event.currentIntent.slots.date}`;
    cb(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
    return;
  }
}

/* ---- validation functions  ---- */


validateMnemonicNative = (mnemonic) => {
  return pgQuery("SELECT * FROM mnemonics").then((rows, res) => {
    var found = rows[0].some((elem) => {
      return elem.name == mnemonic
    });
    return lexHelper.buildValidationResult(found, 'mnemonic', found ? null : `we do not support the mnemonic type ${mnemonic}`)
  });
}
/* ------------------------------- */

handler({
  "currentIntent": {
    "slots": {
      "mnemonic": "RTOIC",
      "company": "IBM",
      "date": "2002"
    },
    "name": "requestParameterInfo",
    "confirmationStatus": "None"
  },
  "bot": {
    "alias": "$LATEST",
    "version": "$LATEST",
    "name": "CpatHelpdesk"
  },
  "userId": "John",
  "invocationSource": "DialogCodeHook",
  "outputDialogMode": "Text",
  "messageVersion": "1.0",
  "sessionAttributes": {}
}, null, (data) => {
  console.log(data);
  return;
});


module.exports = {
  handler
}