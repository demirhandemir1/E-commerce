import axios from 'axios'
import {FETCH_CATEGORY_LIST} from '../constans';
const BASE_URL = process.env.REACT_APP_API_URL

export const fetchCategoryList = () => {
  return async dispatch => {
    await axios.get(`${BASE_URL}/categories`).then(value => {
      dispatch({
        type: FETCH_CATEGORY_LIST,
        payload: value.data
      });
    });
  };
}




