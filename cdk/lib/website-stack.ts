import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  PriceClass,
} from 'aws-cdk-lib/aws-cloudfront';

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, 'SlapoviZrmanjeBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      accessControl: BucketAccessControl.PRIVATE,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'SlapoviZrmanjeBucketOAI',
      {
        comment: 'OAI for cloudfront distribution origin',
      }
    );

    websiteBucket.grantRead(originAccessIdentity);

    const websiteDistribution = new CloudFrontWebDistribution(
      this,
      'SlapoviZrmanjeDistribution',
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
              originAccessIdentity: originAccessIdentity,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        priceClass: PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: '/index.html',
            errorCachingMinTtl: 10,
          },
        ],
      }
    );

    new BucketDeployment(this, 'SlapoviZrmanjeDeployment', {
      sources: [Source.asset('dist/slapovi-zrmanje-app')],
      destinationBucket: websiteBucket,
      distribution: websiteDistribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'url', {
      value: `https://${websiteDistribution.distributionDomainName}`,
    });
  }
}
