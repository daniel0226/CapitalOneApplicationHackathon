import axios from 'axios';
import {getUrl} from './purchaseService';
import {Merchant} from "./global.type";
const arraySort = require('array-sort');

export const generateDepositsByID = async (accountID: string) => {
    const url = getUrl(`/accounts/${accountID}/deposits`);
    const date = new Date();
    for (let i = 0; i < 365; i++) {
        
        date.setDate(date.getDate() - 1);
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
        const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;

        var amount = Math.floor(Math.random() * 1500);

        const body = {
            medium: "balance",
            transaction_date: formattedDate,
            status: "completed",
            description: "Deposit",
            amount: amount
        };

        try{
            const response = await axios.post(url, body);
        }catch(error){
            console.error("");
            throw error;
        }
    }
};

export const GetAllDepositsByID = async (accountId:string) => {
    const url = getUrl(`/accounts/${accountId}/deposits`);
    try
    {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    }catch(error)
    {
        throw error;
    }
};