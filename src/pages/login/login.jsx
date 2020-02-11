import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from './img/logo.jpg'
import './css/login.less'
const {Item} = Form
 class Login extends Component {
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
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
        <Form.Item>
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
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码' }
        
          ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>

          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </Form.Item>
      </Form>
          </div>
          </div>
      
    )
  }
}
export default Form.create()(Login);
