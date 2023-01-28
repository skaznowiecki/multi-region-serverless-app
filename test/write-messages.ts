import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";
const dynamodb = new DynamoDB.DocumentClient({
  region: "us-west-2",
});

interface Message {
  pk: string;
  text: string;
}

const writeMessages = async (messages: Message[]) => {
  const params: DynamoDB.DocumentClient.BatchWriteItemInput = {
    RequestItems: {
      ["Messages"]: messages.map((message) => {
        return {
          PutRequest: {
            Item: message,
          },
        };
      }),
    },
  };
  return dynamodb.batchWrite(params).promise();
};

const init = async () => {
  const messages: Message[] = [];

  for (let i = 0; i < 25; i++) {
    messages.push({
      pk: v4(),
      text: `Message ${i}`,
    });
  }
  await writeMessages(messages);
};

init();
