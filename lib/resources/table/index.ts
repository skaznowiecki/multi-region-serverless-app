import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

const MAIN_REGION = "us-east-1";
const regions = ["us-east-1", "us-west-2"];

export const constructTable = (
  scope: Construct,
  region: string
): dynamodb.ITable => {
  if (region == MAIN_REGION) {
    return new dynamodb.Table(scope, "Table", {
      tableName: `Messages`,
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      replicationRegions: regions.filter((r) => r !== MAIN_REGION),
    });
  }

  return dynamodb.Table.fromTableName(scope, "Table", "Messages");
};
