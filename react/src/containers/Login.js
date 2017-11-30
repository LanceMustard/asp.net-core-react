import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const FormItem = Form.Item;
const LoginForm = styled(Form)`
  width: 300px;
  margin: auto;
`
const LoginButton = styled(Button)`
  width: 100%;
`
const ForgotPasswordLink = styled(Link)`
  float: right;
`

class LoginBasic extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginForm onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <ForgotPasswordLink to="\">
            Forgot password
          </ForgotPasswordLink>
          <LoginButton type="primary" htmlType="submit" className="login-form-button">
            Log in
          </LoginButton>
          Or <a href="">request access!</a>
        </FormItem>
      </LoginForm>
    );
  }
}

const Login = Form.create()(LoginBasic);

export default Login;