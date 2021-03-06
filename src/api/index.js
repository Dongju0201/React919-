//该文件保存各种发请求，不用写 太多的业务逻辑



import myAxios from './myAxios'
import {WEATHER_BASE_URL,WEATHER_AK} from '../config'
import {message} from 'antd'
import jsonp from 'jsonp'









 export  const sendLogin=(username,password)=>myAxios.post('/login',{username,password})


 export const reqWeather = () => {
	const url = `${WEATHER_BASE_URL}?location=北京&output=json&ak=${WEATHER_AK}`
	return new Promise((resolve,reject)=>{
		jsonp(url,(err,data)=>{
			if(!err){
				const {temperature} = data.results[0].weather_data[0]
				const {dayPictureUrl} = data.results[0].weather_data[0]
				const weatherObj = {temperature,dayPictureUrl}
				resolve(weatherObj)
			}else{
				message.error('请求天气数据失败，请联系管理员')
			}
		})
	})
}