const dbCon = require('./connectPostgres')

const fetchMnemonics = () => {
  return dbCon.query('SELECT * FROM mnemonics').then((response) => {
    console.log(response);
    return response[0];
  });
}

const fetchCompanies = () => {
  return dbCon.query('SELECT * FROM companies').then((response) => {
    return response[0];
  })
}

fetchMnemonics();

module.exports = {
  fetchCompanies,
  fetchMnemonics
}