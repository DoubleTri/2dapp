import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import { Modal, Form, Icon, Input, Button, Col } from 'antd';

const FormItem = Form.Item;

function LoginForm(props) {

  const [logInObj, setLogInObj] = useState({ email:null, password: null });
  const [show, setShow] = useState(false)

    const onChangeText = (e) => {
        let newlogInObj = Object.assign({}, logInObj);
        newlogInObj[e.target.id] = e.target.value;
        setLogInObj(newlogInObj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const promise = auth.signInWithEmailAndPassword(logInObj.email, logInObj.password);
                promise.catch(e => alert(e.message));
                props.form.resetFields()
            }
        });
    }

    const forgotPassword = () => {
      var emailAddress = logInObj.passwordChange

      auth.sendPasswordResetEmail(emailAddress).then(function () {
        setShow(false)
        alert('Please check your email for password reset instructions')
      }).catch(function (error) {
        if (error.code === 'auth/user-not-found') {
          alert(emailAddress + ' is not on file')
        } else {
          alert(error.message)
        }
      })
    }
  
  const { getFieldDecorator } = props.form;
  
  return (
    <div className="CreateInvite">
      <h3>Login</h3>

      <Form onSubmit={handleSubmit} className="login-form">

        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please enter your email.' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={onChangeText} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter your password.' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={onChangeText} type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem>
            <Button htmlType="submit">Log in</Button>
            <br />
            <p onClick={() => setShow(true)}>Forgot password</p>
            <p><Link to="/create-account">Create Account </Link></p>
          </FormItem>

        </Col>
      </Form>

      <Modal
          title="Password Recovery"
          visible={show}
          onCancel={() => setShow(false)}
          footer={null}
        >
          <p>Please enter the email address associated with this account</p>
          <Input
            id='passwordChange'
            placeholder="Enter Your Email"
            type="email"
            onChange={onChangeText}
          />
          <br />
          <hr />
          <br />
            <Button onClick={forgotPassword}>Submit</Button>
            <Button onClick={() => setShow(false)}>Close</Button>
        </Modal> 

    </div>
  );
}
  
const Login = Form.create()(LoginForm);

export default Login; 