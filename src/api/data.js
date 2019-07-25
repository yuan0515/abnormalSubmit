import axios from 'axios';
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     if(config.method!='get'){
//         config.data=qs.stringify(config.data);
//     }
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//     return config;
// },function (error) {
//     return Promise.reject(error)

// })

export const HOST = 'http://47.99.107.65:8088';

export const saveForm = function(data){
  let url = HOST + '/saveExceptionInfo';
  // return axios.post(url, qs.stringify(data), {
  //   headers: {
  //       'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  //     }
  // })
  return axios({
    url: url,
    method: 'post',
    data: data,
    // headers: {
    //   'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    // }
  })
}
export const getRegion = function(){
  let url = HOST + '/getRegionList';
  return axios({
    url: url,
    method: 'post',
    // headers: {
    //   'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    // }
  })
}