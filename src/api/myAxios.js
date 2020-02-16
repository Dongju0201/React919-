import axios from 'axios'
import qs from 'querystring'
import {BASE_URL} from '../config/index'
import NProgress from 'nprogress'
import  'nprogress/nprogress.css'

axios.defaults.baseURL = BASE_URL


 axios.interceptors.request.use((config)=>{
  NProgress.start();
const {method,data} = config
if(method.toLowerCase()==="post" && data instanceof Object){
    config.data = qs.stringify(data)
    //config.data是取到那个变量，data是恒定的
}

return config

})

 axios.interceptors.response.use(
 (response)=>{
  NProgress.done();
   return response.data 
  
             
 },
 (error)=>{
  NProgress.done();
    alert("网络错误",error);
 return new Promise(()=>{})
 }
 
 )
export default axios