# Multi region serverless app

PoC to demonstrate how to build a multi region serverless app using AWS CDK and keep dynamodb tables in sync.

In this case, we have a dynamodb table in us-east-1 and us-west-2 regions. We want to keep the tables in sync. We use AWS EventBridge to send events from one region to another. We use AWS Lambda to listen to the events and update the table in the other region.

# Architecture

![Architecture](https://github.com/skaznowiecki/dynamodb-eventbridge-pipe/blob/main/assets/architecture.png)

# Step to deploy

1. Clone the repo
2. Run `npm install`
3. Run `cdk bootstrap` to bootstrap your AWS account
4. Set up your environment variables in `bin/multi-region-serverless-app.ts`
5. Run `cdk deploy` to deploy the stack

# Step to test

1. Move to the `test` directory
2. Run `npm ts-node test.ts` to test the stack
3. Check the DynamoDB tables in both regions to see the changes
