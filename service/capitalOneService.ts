const urlBuilder = require('url');
import axios from 'axios';
const arraySort = require('array-sort');

export const getTopThreePurchasesToday = async (accountId: string) => {
    const sortedPurchases = await getPurchasesSortedHighToLowToday(accountId);
    return sortedPurchases.slice(0,3);
}

export const getPurchasesSortedHighToLowToday = async (accountId: string) => {
    const purchases = await getPurchases(accountId);
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const purchasesMadeToday = [];
    for (const purchase of purchases) {
        if (purchase.purchase_date === formattedDate) {
            purchasesMadeToday.push(purchase);
        }
    }

    return arraySort(purchases, 'amount', {reverse:true});
};

export const getPurchases = async (accountId: string) => {
    const url = getUrl(`/accounts/${accountId}/purchases`);
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(`There was an error attempting to get purchases from accountId: ${accountId}`, error);
        throw error;
    }
};

export const getUrl = (pathname: string) => {
    return urlBuilder.format({
        protocol: 'http:',
        host: 'api.reimaginebanking.com',
        pathname,
        query: {
            key: '9c1ac5d3dab026944436f0acda93c966'
        }
    });
};
