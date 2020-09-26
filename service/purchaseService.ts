const urlBuilder = require('url');
import axios from 'axios';

const arraySort = require('array-sort');

export const getDailyTopPurchasesForPastWeek = async (accountId: string) => {
    const retData = [];
    const purchases = await getPurchases(accountId);
    let date = new Date();
    for (let i = 0; i < 7; i++) {
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
        const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
        const topPurchases = sortPurchasesHighToLowByDate(purchases, formattedDate);
        const totalAmount = getPurchaseTotal(topPurchases);
        console.log(date.getDate());
        date.setDate(date.getDate() - 1);
        retData.push({
            topThree: topPurchases.slice(0,3),
            dailyTotal: totalAmount,
            date: formattedDate
        });
    }
    return retData;
};

const getPurchaseTotal = (purchases: any) => {
    let sum = 0;
    for (const purchase of purchases) {
        sum += purchase.amount;
    }

    return sum;
}

export const sortPurchasesHighToLowByDate = (purchases: any, formattedDate: string) => {
    console.log('THIS IS THE FORMATTED DATE: ' + formattedDate);
    const purchasesMadeToday = [];
    for (const purchase of purchases) {
        if (purchase.purchase_date === formattedDate) {
            purchasesMadeToday.push(purchase);
        }
    }

    console.log('THIS IS THE ARRAY SIZE: ' + purchasesMadeToday.length);

    return arraySort(purchasesMadeToday, 'amount', {reverse: true});
};

export const getTopThreePurchases = async (accountId: string, formattedDate: string) => {
    const sortedPurchases = await getPurchasesSortedHighToLow(accountId, formattedDate);
    return sortedPurchases.slice(0, 3);
};

export const getPurchasesSortedHighToLow = async (accountId: string, formattedDate: string) => {
    const purchases = await getPurchases(accountId);
    const date = new Date();
    const purchasesMadeToday = [];
    for (const purchase of purchases) {
        if (purchase.purchase_date === formattedDate) {
            purchasesMadeToday.push(purchase);
        }
    }

    return arraySort(purchases, 'amount', {reverse: true});
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
