import axios from 'axios'
import {FETCH_PRODUCT_LIST, FETCH_PRODUCT_DETAIL, FETCH_SEARCHED_PRODUCT} from '../constans';
const BASE_URL = process.env.REACT_APP_API_URL

export const fetchProductList = () => {
  return async dispatch => {
    await axios.get(`${BASE_URL}/products`).then(value => {   
      dispatch({
        type: FETCH_PRODUCT_LIST,
        payload: value.data
      });
    });
  };
}

export const fetchProductSuggestion = () => {
  return async dispatch => {
    await axios.get(`${BASE_URL}/products`).then(value => {
      dispatch({
        type: "FETCH_PRODUCT_LIST_SUGGESTION",
        payload: (value.data.sort(() => Math.random() - 0.5)).splice(1,10) //random ürün listesi
      });
    });
  };
}

export const fetchProductDetail = (slug) => {
  return async dispatch => {
    await axios.get(`${BASE_URL}/product-detail?slug=${slug}`).then(value => {
      dispatch({
        type: FETCH_PRODUCT_DETAIL,
        payload: value.data
      });
    });
  };
}

export const fetchProductFilter = (catName) => {
  return async dispatch => {
    dispatch({
      type: "FETCH_PRODUCT_FILTER",
      payload: catName
    });
  };
}

export const fetchSearchedProduct = (searchedProduct) => {
  return async dispatch => {
    await axios.get(`${BASE_URL}/products?name=${searchedProduct}`).then(value => {
      dispatch({
        type: FETCH_SEARCHED_PRODUCT,
        payload: value.data
      });
    });
  };
}

export const fetchProductAddComment = (comment, star, product, productComment, commentOwner ) => {
  return function () {
    axios.put(`${BASE_URL}/product-detail/${product.id}`, {
      id: product.id,
      slug: product.slug,
      company: product.company,
      description: product.description,
      star: product.star,
      image: product.image,
      price: product.price,
      comments: [
        ...productComment,
        {
        star: star,
        commentOwner: commentOwner,
        comment: comment
      }]
    })
  };
}