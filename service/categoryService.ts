import axios from 'axios';
import {getUrl} from './purchaseService';
import {getMerchantCategoryDictionary} from './merchantService';
import {getPurchases, getPurchasesSum} from './purchaseService';
const arraySort = require('array-sort');

export const getPricePercentages = async (accountId: string) : Promise<Map<object, number>> => {
    const Purchases = await getPurchases(accountId);
    const Merchants = await getMerchantCategoryDictionary();
    let sum = getPurchasesSum(Purchases);
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

        if(PricePercentages.has(category))
        {
            currentValue += parseFloat(PricePercentages.get(category));
        }

        PricePercentages.set(category, (currentValue/sum));
    }

    return PricePercentages;
};