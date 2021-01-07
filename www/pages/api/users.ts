import AWS from 'aws-sdk';
import { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  AttributeType,
  UsersListType,
  UserType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider';

import config from '../../src/aws-exports';
import { into, map, sequence } from '../../src/fp';

AWS.config.update({
  region: process.env.USER_POOL_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const params = {
  UserPoolId: config.aws_user_pools_id,
};

const snakeToCamelCase = (str: string) =>
  str.replace(/(_\w)/g, (m) => m[1].toUpperCase());

const camelToSnakeCase = (str: string) =>
  str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`);

const extractNameValue = (obj: AttributeType) => ({
  [snakeToCamelCase(obj.Name)]: obj.Value,
});

const formatUserAttrs = ({ Attributes, Username, UserStatus }: UserType) => ({
  attributes: into({}, map(extractNameValue), Attributes),
  username: Username,
  status: UserStatus,
});

const formatUserData = (Users: UsersListType) =>
  sequence(map(formatUserAttrs), Users);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Auth } = withSSRContext({ req });
  const cognitoISP = new AWS.CognitoIdentityServiceProvider();
  try {
    await Auth.currentAuthenticatedUser();
    const response = await cognitoISP.listUsers(params).promise();
    const data = formatUserData(response.Users);
    res.json({ data });
  } catch (err) {
    console.log(err);
    if (err === 'The user is not authenticated') {
      return res.status(401).json({ message: 'access not allowed' });
    }
    res.json({ message: err.message });
  }
};

export default handler;
