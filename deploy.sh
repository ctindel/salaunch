#!/bin/bash

export STAGE=dev

cd backend; 
./node_modules/serverless/bin/serverless create_domain --stage $STAGE --region us-east-2 && \
./node_modules/serverless/bin/serverless create_domain --stage $STAGE --region us-west-2 && \
./node_modules/serverless/bin/serverless deploy --stage $STAGE --region us-east-2 && \
./node_modules/serverless/bin/serverless deploy --stage $STAGE --region us-west-2
cd -;

aws dynamodb create-global-table \
    --global-table-name phonebook-api-$STAGE \
    --replication-group RegionName=us-east-2 RegionName=us-west-2 \
    --region us-east-2
