import axios from 'axios';
import Cookie from 'js-cookie';

const endpoint = process.env.FIXER_ENDPOINT;
const apiKey = process.env.FIXER_API_KEY;

export const setCurrency = (currency) => {
  Cookie.set('currency', currency);
}

export const getCurrency = () => {
  return Cookie.get('currency');
}

export const getUSDRate = async () => {
  return await axios
    .get(`${endpoint}?access_key=${apiKey}`)
    .then((response) => {
      return 1 / response.data.rates['USD'];
    })
    .catch(()=>{});
} 

export const setUSDRate = async () => {
  const rate = await getUSDRate();
  Cookie.set('USDRate', rate, { expires: 1 });
  return rate;
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