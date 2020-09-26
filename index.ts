import * as AWS from 'aws-sdk';

AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
};
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getDailyTopPurchasesForPastWeek, getPurchasesSortedHighToLow} from "./service/purchaseService";
import {generatePurchases} from "./service/generatePurchasesService";
import {getMerchants} from './service/merchantService';

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
        if (event.pathParameters != null) {
            await generatePurchases(event.pathParameters.accountId);
        }
    }

    if (event.httpMethod === 'GET') {
        console.log('GET Method is called');

        if (event.resource === '/purchases/{accountId}/daily/top' && event.pathParameters != null) {
            const sortedPurchases = await getDailyTopPurchasesForPastWeek(event.pathParameters.accountId);
            console.log(`Result from getTopThreePurchasesToday with ${JSON.stringify(sortedPurchases)}`);
            return {
                statusCode: 200,
                body: JSON.stringify(sortedPurchases)
            };
        }
        if(event.path === '/merchants' && event.pathParameters != null)
        {
            const getAllMerchants = await getMerchants();
            console.log(`Result from GetAllMerchants: ${JSON.stringify(getAllMerchants)}`);
            return {
                statusCode: 200,
                body: JSON.stringify(getAllMerchants)
            };
        }
    }

    return response;
};
