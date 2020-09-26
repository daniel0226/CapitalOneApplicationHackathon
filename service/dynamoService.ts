import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const selectn = require('selectn');

export const something = async (ex: string, ex2: string) => {
    const query = {
        Key: {
            '???': {
                S: ex
            }
        },
        TableName: '???'
    };
    const user = await dynamoDb.getItem(query).promise();
    if (user === null || Object.keys(user).length === 0 || !user.Item) {
        return null;
    }

    return {};
};