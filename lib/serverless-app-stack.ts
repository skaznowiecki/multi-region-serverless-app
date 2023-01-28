import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { constructApiGateway } from "./resources/api-gateway";
import { constructTable } from "./resources/table";
import { constructGetMessage } from "./functions/get-message";
import { constructCertificate } from "./resources/certificate";
import { constructHostedZone } from "./resources/hosted-zone";
import { DomainName, HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha";

interface ServerlessAppProps extends cdk.StackProps {
  domainName: string;
}

export class ServerlessAppStack extends cdk.Stack {
  readonly api: HttpApi;
  readonly apiDomainName: DomainName;

  constructor(scope: Construct, id: string, props: ServerlessAppProps) {
    super(scope, id, props);

    const hostedZone = constructHostedZone(this, props.domainName);

    const certificate = constructCertificate(
      this,
      props.domainName,
      hostedZone
    );

    const { api, apiDomainName } = constructApiGateway(
      this,
      props.domainName,
      certificate
    );

    const table = constructTable(this, props.env!.region!);

    constructGetMessage(this, api, table);

    this.api = api;
    this.apiDomainName = apiDomainName;
  }
}
