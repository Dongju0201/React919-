import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { Form, Icon, Input, Button, message } from 'antd';
import logo from './img/logo.jpg'
import './css/login.less'
import  { sendLogin } from '../../api/index'
import {connect} from 'react-redux'
import {createSaveUserAction} from '../../redux/action/login'

const {Item} = Form
 class Login extends Component {
  //这里仅能使用validator不然会导致没效果
   passwordValidator = (rule,value,callback)=>{
    // 这里的回调必须返回一个callback
    if(!value){
     callback("密码是必须输入的")
     
    }else if(value.length<4){
      callback("密码必须大于4位")
    }else if(value.length>12){
      callback("密码不能大于12位")

    }else if(!(/^\w+$/).test(value)){
      callback('密码必须是英文、数字或下划线组成')
    }
    
    else{
      callback()
    }



   }



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
     

      if (!err) {
        const {username,password} = values
       let result = await sendLogin(username,password)
       const {status,data,msg}  = result
  if(status===0){
    message.success("登录成功")
    
this.props.saveUserInfo(data)

    this.props.history.replace("/admin")
  }
  
  
  else{
    message.warning(msg)
  }
     
        
      }
    });
  };

  render() {

    const {isLogin } = this.props.userInfo
    if(isLogin){
     return<Redirect to="/admin"/>
    }
   

    const { getFieldDecorator } = this.props.form;
    return (
    
       	<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的用户名' },
          	{max:12,message: '用户名必须小于等于12位'},
										{min:4,message: '用户名必须大于等于4位'},
										{pattern:/^\w+$/,message: '用户名必须是英文、数字或下划线组成'}
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' },
            {validator:this.passwordValidator}
        
          ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Item>
        <Item>

          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </Item>
      </Form>
          </div>
          </div>
      
    )
  }
}
 Form.create()(Login);

 export default connect(
   (state)=>({userInfo:state.userInfo}),
   {
    saveUserInfo:createSaveUserAction
   }
 )(Form.create()(Login))