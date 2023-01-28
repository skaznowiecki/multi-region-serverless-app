import { Construct } from "constructs";
import { HttpApi, CorsHttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha";
import { DomainName } from "@aws-cdk/aws-apigatewayv2-alpha";

import { Duration } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

interface ApiGateway {
  api: HttpApi;
  apiDomainName: DomainName;
}

export const constructApiGateway = (
  scope: Construct,
  domainName: string,
  certificate: Certificate
): ApiGateway => {
  const apiDomainName = new DomainName(scope, "DN", {
    domainName,
    certificate,
  });

  const api = new HttpApi(scope, "ApiGateway", {
    apiName: "message-api-gateway",
    corsPreflight: {
      allowOrigins: ["*"],
      allowMethods: [CorsHttpMethod.ANY],
      allowHeaders: ["*"],
      maxAge: Duration.seconds(10),
    },
    defaultDomainMapping: {
      domainName: apiDomainName,
    },
  });

  return {
    api,
    apiDomainName,
  };
};
