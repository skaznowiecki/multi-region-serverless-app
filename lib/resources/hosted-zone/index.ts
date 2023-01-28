import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";

export const constructHostedZone = (
  scope: Construct,
  domainName: string
): route53.IHostedZone => {
  return route53.HostedZone.fromLookup(scope, "HostedZone", {
    domainName,
  });
};
