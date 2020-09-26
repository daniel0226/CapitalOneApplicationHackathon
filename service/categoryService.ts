import axios from 'axios';
import {getUrl} from './purchaseService';
import {getMerchantCategoryDictionary, getMerchants} from './merchantService';
import {getPurchases} from './purchaseService';
const arraySort = require('array-sort');

export const getPricePercentages = async (accountId: string) => {
    const Purchases = await getPurchases(accountId);
    const Merchants = await getMerchantCategoryDictionary();
};