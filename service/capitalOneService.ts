const urlBuilder = require('url');
import axios from 'axios';
const arraySort = require('array-sort');

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
