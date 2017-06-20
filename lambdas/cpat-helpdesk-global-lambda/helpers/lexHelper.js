elicitSlot = (sessionAttributes, intentName, slots, slotToElicit, message) => {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
    },
  };
}

buildValidationResult = (isValid, violatedSlot, messageContent) => {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot,
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

close = (sessionAttributes, fulfillmentState, messageContent) => {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message:{ contentType: 'PlainText', content: messageContent }
        },
    };
}

function delegate(sessionAttributes, slots) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Delegate',
            slots,
        },
    };
}


module.exports = {
  delegate,
  close,
  elicitSlot,
  buildValidationResult
}