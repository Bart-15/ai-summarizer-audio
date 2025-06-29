import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import * as path from "path";

export class SummaryAudioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const summarizeFn = new NodejsFunction(this, "SummarizeFunction", {
      entry: path.join(__dirname, "../lambda/summarize.handler.ts"),
      runtime: Runtime.NODEJS_22_X,
      bundling: {
        forceDockerBundling: false, // 👈 Use local instead of Docker
      },
    });

    const summaryApi = new RestApi(this, "SummaryApi", {
      restApiName: "AI Smart Summary API",
    });

    const summarize = summaryApi.root.addResource("summarize");
    summarize.addMethod("POST", new LambdaIntegration(summarizeFn));
  }
}
