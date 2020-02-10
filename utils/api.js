import axios from 'axios'
import {message} from 'antd';
import getObjectValue from 'lodash/get';
import cookies from 'next-cookies';
import Cookies from 'js-cookie';

const serverHost = process.env.SERVER_HOST;

const getAuthHeader = (ctx) => {  
  try {
    if (ctx) {
      const { access_token } = cookies(ctx);
      if (access_token) {
        return {
          Authorization: `Bearer ${access_token}`
        }
      } else {
        return;
      }
    } else {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        return {
          Authorization: `Bearer ${access_token}`
        }
      } else {
        return;
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

const config = (params, ctx) => {
  const headers = getAuthHeader(ctx)  
  return {
    headers: headers,
    params: params
  };
}

export const get = async (endpoint, params = {}, ctx = null, onError = defaultErrorMessage) => {
  return await axios
    .get(serverHost + endpoint, params, { headers: getAuthHeader(ctx) })
    .then((response) => {
      return response;
    })
    .catch(onError);
};

export const post = async (endpoint, params = {}, ctx = null, onError = defaultErrorMessage) => {
  return await axios
    .post(serverHost + endpoint, params, { headers: getAuthHeader(ctx) })
    .then((response) => {
      return response;
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
  return getObjectValue(error, 'response', null);
});