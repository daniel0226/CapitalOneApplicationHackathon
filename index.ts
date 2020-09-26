import * as AWS from 'aws-sdk';

AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
};
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {getDailyTopPurchasesForPastWeek, getPurchasesSortedHighToLow, getPurchasesSum} from "./service/purchaseService";
import {generatePurchases} from "./service/generatePurchasesService";
import {getMerchants, getMerchantCategoryDictionary} from './service/merchantService';
import {getPricePercentages} from './service/categoryService';
import { generateDepositsByID, GetAllDepositsByID } from './service/depositService';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello World Panda'
    };

    console.log('BELOW IS THE EVENT');
    console.log(JSON.stringify(event));

    if (event.httpMethod === 'POST') {
            if(event.resource === '/deposits/{accountId}/generate' && event.pathParameters != null)
            {
                const createDeposits = await generateDepositsByID(event.pathParameters.accountId);
                console.log(createDeposits);
                return {
                    statusCode: 200,
                    body: JSON.stringify(createDeposits)
                };
            }
    }

    if (event.httpMethod === 'PUT') {
        if (event.pathParameters != null) {
            //await generatePurchases(event.pathParameters.accountId);
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
        if(event.path === '/merchants')
        {
            const getAllMerchants = await getMerchants();
            console.log(`Result from GetAllMerchants: ${JSON.stringify(getAllMerchants)}`);
            return {
                statusCode: 200,
                body: JSON.stringify(getAllMerchants)
            };
        }

        if(event.path === '/test')
        {
            const testFunction = await GetAllDepositsByID("5f6ea470f1bac107157e1199");
            console.log(`Result from test`);
            console.log(testFunction);
        }
    }

    return response;
};
