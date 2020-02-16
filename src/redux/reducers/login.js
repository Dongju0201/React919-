 import {SAVE_USERINFO,DELETE_USERINFO} from '../action_type'


 const Luser = JSON.parse(localStorage.getItem("user"))
 const Ltoken = localStorage.getItem("token")


 let initState =
 {
   user:Luser || {},
   token:Ltoken || "", 
   isLogin:(Luser&&Ltoken)? true: false

 }
 
 
 
 export default function (preState = initState,action) {
  
  const {type,data} = action

let newState
  switch (type) {
    case SAVE_USERINFO:
      const{user,token}  = data
      newState = {user,token,isLogin:true}
      return newState
    case DELETE_USERINFO:
     
      newState = {user:{},token:"",isLogin:false}
      return newState
  
    default:
      return preState
     
  }


}