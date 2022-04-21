import axios from 'axios';

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
});

export const getProductsByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};  

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
});

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};  

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
});


export const getProducts = async (sort,order,page) => {
  return await axios.post(`${process.env.REACT_APP_API}/products`,
  {
    sort,
    order,
    page,
  });
};  

export const getProductsCount = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};  

export const getRelated = async (productId) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
};  

export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};  