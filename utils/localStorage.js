export const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart'));
  } catch (error) {
    localStorage.removeItem('cart');
    return {
      items: [],
      total: 0
    }
  }
}

export const removeCart = () => {
  localStorage.removeItem('cart');
}