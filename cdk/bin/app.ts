import { App } from 'aws-cdk-lib';
import { WebsiteStack } from '../lib/website-stack';

const app = new App();

new WebsiteStack(app, `slapovi-zrmanje-fe`, {
  env: { region: 'eu-central-1' },
});
