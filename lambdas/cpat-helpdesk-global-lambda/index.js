const lexHelper = require('./helpers/lexHelper')
const path = require('path');

handler = (event, context, callback) => {
  try {
    const intent = require('./intents/' + event.currentIntent.name);
    intent.handler(event, context, callback);
  }
  catch (err) {
    callback(err.toString());
  }
}

// handler({
//   "currentIntent": {
//     "slots": {
//       "deck" : "hisytorical cash position"
//     },
//     "name": "getDeck",
//     "confirmationStatus": "None"
//   },
//   "bot": {
//     "alias": "$LATEST",
//     "version": "$LATEST",
//     "name": "OrderFlowers"
//   },
//   "userId": "John",
//   "invocationSource": "DialogCodeHook",
//   "outputDialogMode": "Text",
//   "messageVersion": "1.0",
//   "sessionAttributes": {}
// },null, (err, data) => {
//   console.log(data);
// });


module.exports = {
  handler
}