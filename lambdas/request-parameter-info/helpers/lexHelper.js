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
    message: { contentType: 'PlainText', content: messageContent },
  };
}

module.exports = {
  elicitSlot,
  buildValidationResult
}