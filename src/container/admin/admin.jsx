import React, { Component } from 'react'

import {Layout} from 'antd';
import Header from '../header/header'
import './admin.less'
const {Footer,Sider,Content} = Layout;


class Admin extends Component {
	render() {
		return (
			<Layout className="layout">
				<Sider>Sider</Sider>
				<Layout>
					<Header/>
					<Content style={{backgroundColor:'skyblue'}}>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Admin


