# CPAT-Helpdesk

## POC Objective 

The aim of the project was to build a conversational question answer based chatbot. The project is as of now a POC and is to primarily serve the following functions
* act as a general helpdesk to the users, where users can inquire about the capabilities of CPAt and find the correct section of the application for their query       
* act as an alternate more intuitive interface for the users to specify and customise their queries for the data they require
* The bot is also expected to maintain a conversation flow and further probe the user for any crucial information that he may have missed.

### Sample Conversations 
Q > what is the Return on investment value for IBM 
A > during what period
Q > during 2002-2003
Q > you can find the required information at <LINK>

Q > compare IBM and Apple on historical cash position
A > you can find the required information at <LINK>


## Proposed Solution 

The problem can solved by building an intent based chatbot Model specific to the required context.
This can be broken down into following parts

* **Understanding the question** - The bot would first need to extract the required information from the question posed by the user such as the intent of the question and the different entitites present in it. The intent is used to direct the bot to execute one of the predefined branches (also know as intents in AWS lex), while the different entities are the required for the fulfilment of the intent. This part is handled by AWS lex's inbuild NLU parser 

* **Validatiion of the entities** - The bot will then need to check for validity of the information provided by the user (entities) and also prompt for missing entities

* **Processing entities and responding back** - The bot will then need to process the entities in some manner and return a response to the user. For example for a given deck name and company as entities the bot can process the information and return the link to an API endpoint.

### Technologies used

**Amazon Lex** - Amazon Lex is a service for building conversational interfaces into any application using voice and text. Amazon Lex provides the advanced deep learning functionalities of automatic speech recognition (ASR) for converting speech to text, and natural language understanding (NLU) to recognize the intent of the text, to enable you to build applications with highly engaging user experiences and lifelike conversational interactions.

**AWS Lambda** - AWS Lambda lets you run code without provisioning or managing servers. Amazon lex can be combined with AWS lambda which can be used as code hook for validation and fulfillment through lex. 

### MEthodologies 