import { Construct } from "constructs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

export const constructCertificate = (
  scope: Construct,
  domainName: string,
  hostedZone: IHostedZone
): Certificate => {
  return new Certificate(scope, "DNSCertificate", {
    domainName,
    validation: CertificateValidation.fromDns(hostedZone),
  });
};
