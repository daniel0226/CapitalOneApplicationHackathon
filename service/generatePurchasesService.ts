import {getUrl} from "./purchaseService";
import axios from 'axios';

const randomWords = require('random-words');
const merchants = ['57cf75cea73e494d8675ec4c', '57cf75cea73e494d8675ec5b', '589f4a6f1756fc834d9047d7', '57cf75cea73e494d8675ef66'];

export const generatePurchases = async (accountId: string) => {
    const url = getUrl(`/accounts/${accountId}/purchases`);
    const date = new Date();
    let count = 1;

    for (let i = 0; i < 365; i++) {
        date.setDate(date.getDate() - 1);
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
        const formattedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
        for (let num = 0; num < 3; num++) {
            console.log(`Generating purchase ${count}`);
            const randomMerchantId = merchants[Math.floor(Math.random() * merchants.length)];

            const body = {
                merchant_id: randomMerchantId,
                medium: 'balance',
                purchase_date: formattedDate,
                amount: Math.floor(Math.random() * 1000),
                status: 'completed',
                description: randomWords()
            };

            try {
                const response = await axios.post(url, body);
            } catch (error) {
                console.error(`Generate Purchase for date ${formattedDate} failed with body ${body} on error: ${error}`);
                throw error;
            }
            count++;
        }
    }
};
