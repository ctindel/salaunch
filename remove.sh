#!/bin/bash

export STAGE=dev

cd backend;
./node_modules/serverless/bin/serverless remove --stage $STAGE --region us-east-2 
./node_modules/serverless/bin/serverless remove --stage $STAGE --region us-west-2
./node_modules/serverless/bin/serverless delete_domain --stage $STAGE --region us-east-2
./node_modules/serverless/bin/serverless delete_domain --stage $STAGE --region us-west-2
cd -;

aws dynamodb delete-table \
    --table-name phonebook-api-$STAGE \
    --region us-east-2

aws dynamodb delete-table \
    --table-name phonebook-api-$STAGE \
    --region us-west-2
