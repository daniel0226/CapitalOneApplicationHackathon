import axios from 'axios';
import {getUrl} from './purchaseService';
import {getMerchantCategoryDictionary} from './merchantService';
import {getPurchases, getPurchasesSum} from './purchaseService';
const arraySort = require('array-sort');

export const getPricePercentages = async (accountId: string) : Promise<Map<object, number>> => {
    const Purchases = await getPurchases(accountId);
    const Merchants = await getMerchantCategoryDictionary();
    let sum = getPurchasesSum(Purchases);
    const PricesSumByCategory = new Map();
    const PricePercentages = new Map();

    for(var i = 0; i < Purchases.length; i++)
    {
        var purchaseObj = Purchases[i];

        var category = Merchants.get(purchaseObj.merchant_id);

        let currentValue = purchaseObj.amount;

        if(Array.isArray(category))
        {
            category = category[0];
        }

        if(PricesSumByCategory.has(category))
        {
            currentValue += parseFloat(PricesSumByCategory.get(category));
        }

        PricesSumByCategory.set(category, currentValue);

        PricePercentages.set(category, parseFloat(PricesSumByCategory.get(category)) / sum);
    }

    return PricePercentages;
};