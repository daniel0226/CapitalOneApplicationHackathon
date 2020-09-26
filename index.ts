import * as AWS from 'aws-sdk';

AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
};
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello World Panda'
    };

    console.log('BELOW IS THE EVENT');
    console.log(JSON.stringify(event));

    if (event.httpMethod === 'POST') {

    }

    if (event.httpMethod === 'PUT') {

    }

    if (event.httpMethod === 'GET') {
        console.log('GET Method is called');

        if (event.resource === '/resource/{userPhoneNumber}' && event.pathParameters != null) {

        }

        if (event.path === '/path') {

        }
    }

    return response;
};
