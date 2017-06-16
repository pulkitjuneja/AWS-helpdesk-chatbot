const dbHelper = require('./helpers/dbHelper.js')
const lexHelper = require('./helpers/lexHelper')


handler = (event, context, cb) => {

  const source = event.invocationSource;
  const mnemonic = event.currentIntent.slots.mnemonic;
  const company = event.currentIntent.slots.company;

  if (source === 'DialogCodeHook') {
    let promises = [];
    console.log("here");
    promises.push(validateMnemonic(mnemonic));
    promises.push(validateCompany(company));
    Promise.all(promises).then((response) => {
      for (var i = 0; i < response.length; i++) {
        if (!response[i].isValid) {
          cb(null, lexHelper.elicitSlot(event.sessionAttributes, event.currentIntent.name, event.currentIntent.slots, response[i].violatedSlot, response[i].message));
          break;
        }
      }
      dbHelper.closeCon();
    }).catch((error) => {
      console.log(error);
      dbHelper.closeCon();
    })
  }
  else {
    const fulFillMessage = `Answering ${mnemonic} for ${company} during the years ${event.currentIntent.slots.date}`;
    cb(null, lexHelper.close(event.sessionAttributes, 'Fulfilled', fulFillMessage))
    return;
  }
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

handler({
  "currentIntent": {
    "slots": {
      "mnemonic": "ROIC",
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
}, null, (err, data) => {
  console.log(data);
  return ;
});

module.exports = {
  handler
}