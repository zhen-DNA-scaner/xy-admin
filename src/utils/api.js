import axios from '@/utils/axios';

const encodeQuery = query => {
  if(!query) return '';

  let keyArr = [];
  for(let k in query){
    const v = query[k];
    if(v!==null && v!==undefined) keyArr.push(`${k}=${v}`);
  }
  return keyArr.join('&');
}

// login or register
export const getCaptcha = ({body}) => axios.post('/api/captcha', body);
export const register = ({body}) => axios.post('/api/register', body);
export const login = ({body}) => axios.post('/api/login', body);
export const forget = ({body}) => axios.post('/api/forget', body);

// user
export const getUser = () => axios.get(`/api/user`);
export const setUser = ({body}) => axios.put(`/api/user`, body);
export const getUserDynamic = () => axios.get(`/api/userdynamic`);
export const setUserPassword = ({body}) => axios.put(`/api/user/password`, body);
export const sendCaptcha = ({params}) => axios.post(`/api/sendCaptcha/${params}`);
export const validateCaptcha = ({params}) => axios.post(`/api/validateCaptcha/${params}`);
export const setUserEmail = ({body}) => axios.put(`/api/user/email`, body);

// message
export const search = ({query}) => axios.get(`/api/search?${encodeQuery(query)}`);
export const getSitemail = ({query} = {}) => axios.get(`/api/sitemail?${query && encodeQuery(query)}`);
export const getMessage = () => axios.get('/api/message');
export const getTodo = () => axios.get('/api/todo');
export const deleteSitemail = ({body}) => axios.delete('/api/sitemail', body);
export const setSitemail = ({body}) => axios.put('/api/sitemail', body);
export const deleteMessage = ({body}) => axios.delete('/api/message', body);
export const setMessage = ({body}) => axios.put('/api/message', body);
export const deleteTodo = ({body}) => axios.delete('/api/todo', body);

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