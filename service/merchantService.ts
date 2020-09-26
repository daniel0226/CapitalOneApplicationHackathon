import axios from 'axios';
import {getUrl} from './purchaseService';
import {Merchant} from "./global.type";
const arraySort = require('array-sort');

export const getMerchants = async (): Promise<Merchant[]> => {
    const url = getUrl("/merchants");
    try{
        const response = await axios.get(url);
        const data = response.data;
        console.log(JSON.stringify(data));
        return data;
    }catch(error)
    {
        console.error("yeet");
        throw error;
    }
};
