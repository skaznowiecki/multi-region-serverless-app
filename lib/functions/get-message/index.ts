import { HttpMethod, HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha";

import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";

export const constructGetMessage = (
  scope: Construct,
  api: HttpApi,
  messageTable: ITable
): lambda.NodejsFunction => {
  const lambdaFunction = new lambda.NodejsFunction(scope, "GetMessage", {
    functionName: "get-message",
    entry: `${__dirname}/handler.ts`,
    handler: "handler",
    environment: {
      MESSAGES_TABLE_NAME: messageTable.tableName,
    },
    bundling: {
      nodeModules: ["uuid"],
    },
  });

  messageTable.grantReadData(lambdaFunction);

  api.addRoutes({
    path: "/messages",
    methods: [HttpMethod.GET],
    integration: new HttpLambdaIntegration("GetMessage", lambdaFunction),
  });

  return lambdaFunction;
};
