import { DynamoDB } from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const handler = async () => {
  const messages = await getMessages();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Cache-Control": `max-age=10`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      region: process.env.AWS_REGION,
      messages,
    }),
  };
};

const getMessages = async () => {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: process.env.MESSAGES_TABLE_NAME!,
  };

  const result = await dynamodb.scan(params).promise();

  return result.Items;
};
