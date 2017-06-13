const dbHelper = require('./helpers/dbHelper.js')
const lexHelper = require('./helpers/lexHelper')


handler = (event, context, cb) => {

  const source = 'DialogCodeHook'
  const mnemonic = 'ROIC'
  const company = 'event.currentIntent.slots.company;'

  if (source === 'DialogCodeHook') {
    let promises = [];
    console.log('here');
    promises.push(validateMnemonic(mnemonic));
    promises.push(validateCompany(company));
    Promise.all(promises).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }
}

validateMnemonic = (mnemonic) => {
  return dbHelper.fetchMnemonics().then((response) => {
    console.log(response)
    var found = response.some((elem) => {
      return elem.name = mnemonic;
    });
    return lexHelper.buildValidationResult(found, 'mnemonic', found ? null : `we do not support the mnemonic type ${mnemonic}`)
  });
}

validateCompany = (company) => {
  return dbHelper.fetchCompanies().then((response) => {
    console.log(response)
    var found = response.some((elem) => {
      return elem.name = company;
    });
    return lexHelper.buildValidationResult(found, 'company', `sorry we current do not have data from ${company}`)
  })
}


handler(null, null, null);