import axios from 'axios'
import {message} from 'antd';
import getObjectValue from 'lodash/get';

export const serverHost = process.env.SERVER_HOST;

export const get = async (endpoint, params = {}, onError = defaultErrorMessage) => {
  return await axios
    .get(serverHost + endpoint, params)
    .then((response) => {
      return response.data;
    })
    .catch(onError);
};

export const post = async (endpoint, params = {}, onError = defaultErrorMessage) => {
  return await axios
    .post(serverHost + endpoint, params)
    .then((response) => {
      return response.data;
    })
    .catch(onError);
};

export const errorMessage = (text) => {
  message.error(text);
};

export const successMessage = (text) => {
  message.success(text);
};

export const defaultErrorMessage = ((error) => {
  const message = getObjectValue(error, 'response.data.message', 'Something went wrong =(');
  errorMessage(message);
  const errors = getObjectValue(error, 'response.data.errors', null);
  if (errors)
      return getObjectValue(error, 'response.data', null);
});