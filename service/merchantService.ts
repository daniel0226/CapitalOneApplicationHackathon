import axios from 'axios';
import {getUrl} from './purchaseService';
const arraySort = require('array-sort');

export const getMerchants = async () => {
    const url = getUrl("/merchants");
    try{
        const response = await axios.get(url);
        const data = response.data;
        console.log(JSON.stringify(data));
        return data;
    }catch(error)
    {
        console.error(`There was an error attempting to get merchants`, error);
        throw error;
    }
};

export const getMerchantDictionary = async () => {
    try{
        const Merchants = await getMerchants();
        var Dictionary = new Map();

        for(var i = 0; i < Merchants.length; i++)
        {
            var obj = Merchants[i];

            Dictionary.set(obj._id, obj);
        }

        return Dictionary;
    }catch(error)
    {
        console.error(`There was an error attempting to get merchant dictionary`, error);
        throw error;
    }
};

export const getMerchantCategoryDictionary = async () => {
    try{
        const Merchants = await getMerchants();
        var Dictionary = new Map();

        for(var i = 0; i < Merchants.length; i++)
        {
            var obj = Merchants[i];

            Dictionary.set(obj._id, obj.category);
        }

        return Dictionary;
    }catch(error)
    {
        console.error(`There was an error attempting to get merchant category dictionary`, error);
        throw error;
    }
};