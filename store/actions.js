export const SET_APP_CURRENCY = 'SET_APP_CURRENCY';
export const SET_APP_USER = 'SET_APP_USER';

export const setAppCurrency = value => ({
  type: SET_APP_CURRENCY,
  payload: value
});

export const setAppUser = value => ({
  type: SET_APP_USER,
  payload: value
});