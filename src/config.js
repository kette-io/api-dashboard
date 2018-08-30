const dev = {
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://8anb1036e9.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_ldD56v2nc",
    APP_CLIENT_ID: "19vjjdttte071n8ltcaqtn8t98",
    IDENTITY_POOL_ID: "eu-central-1:df52a5f9-9784-4ff7-b410-57a328cf2433"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_XUBDp4nnw",
    APP_CLIENT_ID: "44osnm1bl1vu4mhh1bva8jq36g",
    IDENTITY_POOL_ID: "us-east-1:aedd6077-5a37-489d-924e-adc8ea01dfcf"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
