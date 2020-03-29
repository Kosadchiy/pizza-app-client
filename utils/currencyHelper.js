import Cookie from 'js-cookie';
import { get } from './api';

export const setCurrency = (currency) => {
  Cookie.set('currency', currency);
}

export const getCurrency = () => {
  return Cookie.get('currency');
}

export const getUSDRate = async () => {
  return await get('/api/currency/usd-rate');
} 

export const setUSDRate = async () => {
  const response = await getUSDRate();
  Cookie.set('USDRate', response.data.rate, { expires: 1 });
  return response.data.rate;
} 

export const getMoneyView = (moneyInEUR, appCurrency) => {
  if (appCurrency === 'EUR') {
    return `${moneyInEUR} €`;
  } else {
    const rate = Cookie.get('USDRate');
    const moneyInUSD = rate * moneyInEUR;
    return `$ ${moneyInUSD.toFixed(2)}`;
  }
}