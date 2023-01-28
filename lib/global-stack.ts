import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { constructHostedZone } from "./resources/hosted-zone";
import { DomainName, HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha";
import { CfnRecordSetGroup } from "aws-cdk-lib/aws-route53";

interface GlobalStackProps extends cdk.StackProps {
  domainName: string;
  apis: {
    apiGateway: HttpApi;
    apiDomainName: DomainName;
    region: string;
  }[];
}

export class GlobalStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GlobalStackProps) {
    super(scope, id, props);

    const hostedZone = constructHostedZone(this, props.domainName);

    new CfnRecordSetGroup(this, "ApiRecordSetGroup", {
      hostedZoneId: hostedZone.hostedZoneId,
      recordSets: props.apis.map((api) => ({
        name: props.domainName,
        type: "A",
        aliasTarget: {
          dnsName: api.apiDomainName.regionalDomainName,
          hostedZoneId: api.apiDomainName.regionalHostedZoneId,
        },
        setIdentifier: api.apiGateway.httpApiId,
        region: api.region,
      })),
    });
  }
}
