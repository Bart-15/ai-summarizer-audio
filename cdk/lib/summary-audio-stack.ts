import "dotenv/config";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";

export class SummaryAudioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Audio S3 Bucket
    const audioBucket = new Bucket(this, "AudioOutputBucket", {
      bucketName: `${cdk.Stack.of(this).stackName.toLowerCase()}-audio-bucket`,
    });

    const summarizeFn = new NodejsFunction(this, "SummarizeFunction", {
      entry: path.join(__dirname, "../lambda/summarize.handler.ts"),
      runtime: Runtime.NODEJS_22_X,
      timeout: cdk.Duration.seconds(30),
      bundling: {
        forceDockerBundling: false, // 👈 Use local instead of Docker
      },
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      },
    });

    const cleanupFn = new NodejsFunction(this, "CleanUpAudioFunction", {
      entry: path.join(__dirname, "../lambda/cleanup.handler.ts"),
      runtime: Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(30),
      environment: {
        BUCKET_NAME: audioBucket.bucketName,
      },
    });

    //cleanupFn scheduled event rule
    new Rule(this, "DailyCleanupAudioRule", {
      schedule: Schedule.cron({ minute: "0", hour: "0" }), // Every day at midnight UTC
      targets: [new LambdaFunction(cleanupFn)],
    });

    const summaryApi = new RestApi(this, "SummaryApi", {
      restApiName: "AI Smart Summary API",
    });

    // Grant the Lambda function permissions to use Polly
    summarizeFn.addToRolePolicy(
      new PolicyStatement({
        actions: ["polly:SynthesizeSpeech"],
        resources: ["*"],
      })
    );

    audioBucket.grantDelete(cleanupFn);

    // 👇 Grant read and write access to the Lambda
    audioBucket.grantReadWrite(summarizeFn);
    summarizeFn.addEnvironment("AUDIO_BUCKET_NAME", audioBucket.bucketName);

    const summarize = summaryApi.root.addResource("summarize");

    // 👇 Add OPTIONS method to handle preflight requests
    summarize.addCorsPreflight({
      allowOrigins: ["http://localhost:5173"], // 👈 Match your Vite dev server or add your Production environment
      allowMethods: ["OPTIONS", "POST"],
      allowHeaders: ["Content-Type"],
    });

    summarize.addMethod("POST", new LambdaIntegration(summarizeFn));
  }
}
