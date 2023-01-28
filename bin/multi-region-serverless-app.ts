#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ServerlessAppStack } from "../lib/serverless-app-stack";
import { GlobalStack } from "../lib/global-stack";

const app = new cdk.App();

const REGION_1 = process.env.REGION_1!;
const REGION_2 = process.env.REGION_2!;

const ACCOUNT_ID = process.env.ACCOUNT_ID;

const DOMAIN_NAME = process.env.DOMAIN_NAME!;

const appStackRegion1 = new ServerlessAppStack(
  app,
  "MultiRegionServerlessAppStack-region-1",
  {
    env: {
      account: ACCOUNT_ID,
      region: REGION_1,
    },
    domainName: DOMAIN_NAME,
    crossRegionReferences: true,
  }
);

const appStackRegion2 = new ServerlessAppStack(
  app,
  "MultiRegionServerlessAppStack-region-2",
  {
    env: {
      account: ACCOUNT_ID,
      region: REGION_2,
    },
    domainName: DOMAIN_NAME,
    crossRegionReferences: true,
  }
);

new GlobalStack(app, "GlobalStack", {
  env: {
    account: ACCOUNT_ID,
    region: "us-east-1",
  },
  domainName: DOMAIN_NAME,
  apis: [
    {
      apiDomainName: appStackRegion1.apiDomainName,
      apiGateway: appStackRegion1.api,
      region: REGION_1,
    },
    {
      apiDomainName: appStackRegion2.apiDomainName,
      apiGateway: appStackRegion2.api,
      region: REGION_2,
    },
  ],
  crossRegionReferences: true,
});
