const urlBuilder = require('url');
import axios from 'axios';
import {getPurchases} from './purchaseService';
const arraySort = require('array-sort');

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

