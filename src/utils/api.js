import axios from '@/utils/axios';

const encodeQuery = query => {
  if(!query) return '';

  let keyArr = [];
  for(let k in query){
    if(query[k]) keyArr.push(`${k}=${query[k]}`);
  }
  return keyArr.join('&');
}

// login or register
export const getCaptcha = ({body}) => axios.post('/api/captcha', body);
export const register = ({body}) => axios.post('/api/register', body);
export const login = ({body}) => axios.post('/api/login', body);
export const forget = ({body}) => axios.post('/api/forget', body);

// user
export const getUser = ({path}) => axios.get(`/api/user/${path}`);

// admin
export const search = ({query}) => axios.get(`/api/search?${encodeQuery(query)}`);
export const getNotice = () => axios.get('/api/notice');
export const getMessage = () => axios.get('/api/message');
export const getTodo = () => axios.get('/api/todo');

// analysis
export const getAnalysis = () => axios.get('/api/analysis');
export const getSales = ({query}) => axios.get(`/api/sales?${encodeQuery(query)}`);
export const getPV = ({query}) => axios.get(`/api/pv?${encodeQuery(query)}`);
export const getAnalysisSearch = (data) => {
  let query = '';
  if(data) query = encodeQuery(data.query);
  return axios.get(`/api/analysis/search?${query}`)
};
export const getAnalysisSalescategory = () => axios.get('/api/analysis/salescategory');
export const getAnalysisGoods = () => axios.get('/api/analysis/goods');
export const getAnalysisGood = ({ params, query } = {}) => axios.get(`/api/analysis/good/${params}?${encodeQuery(query)}`);