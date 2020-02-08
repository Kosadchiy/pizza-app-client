import axios from 'axios'
import {message} from 'antd';

export const serverHost = process.env.SERVER_HOST;

export const get = async (endpoint, params = {}, onError = defaultErrorMessage) => {
  return await axios
    .get(serverHost + endpoint, params)
    .then((response) => {
      return response.data;
    })
    .catch(onError);
};

export const defaultErrorMessage = ((error) => {
  
});