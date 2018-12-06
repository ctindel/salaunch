'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
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
    Item: {
      id: uuid.v1(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobilePhone: data.mobilePhone,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the phonebook entry to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the phonebook entry.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
