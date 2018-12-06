'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.firstName !== 'string') {
    console.error('Validation Failed for firstName Field');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the phonebook entry.',
    });
    return;
  }

  if (typeof data.lastName !== 'string') {
    console.error('Validation Failed for lastName Field');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the phonebook entry.',
    });
    return;
  }

  if (typeof data.email !== 'string') {
    console.error('Validation Failed for email Field');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the phonebook entry.',
    });
    return;
  }

  if (typeof data.mobilePhone !== 'string') {
    console.error('Validation Failed for mobilePhone Field');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the phonebook entry.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':firstName': data.firstName,
      ':lastName': data.lastName,
      ':email': data.email,
      ':mobilePhone': data.mobilePhone,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET firstName = :firstName, lastName = :lastName, email = :email, mobilePhone = :mobilePhone, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the phonebook entry in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the phonebook entry item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
