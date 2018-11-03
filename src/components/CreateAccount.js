import React, { useState, useEffect  } from 'react';
import { db, auth } from '../firebase'

import {  Form, Input, Button, Select, message, Tooltip, Icon, notification, Col, InputNumber, Divider } from 'antd';

const FormItem = Form.Item;

function CreateAccountForm(props) {

const [accountObj, setAccountObj] = useState({ 
    firstName: null, 
    lastName: null, 
    email:null, 
    password: null,
    twoDFirstName: null,
    twoDLastName: null,
    twoDEmail: null
 }); 

//   useEffect(() => {
//     db.ref('users').orderByChild('email').equalTo(props.email).once("value", function (snap) {
//       snap.forEach(function (data) {
//         db.ref('users/' + data.key).once("value", function (snapTwo) {
//           snap.forEach(function (name) { setObj(snapTwo.val()) })
//         })
//       });
//     });
//   }, [props.pointObj]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log(accountObj)
                props.form.resetFields()

                auth.createUserWithEmailAndPassword(accountObj.email, accountObj.password).catch(function (error) {
                    alert(error)
                });

                db.ref().child('users/' + accountObj.lastName).set({
                    firstName: accountObj.firstName, 
                    lastName: accountObj.lastName,
                    name: accountObj.firstName + ' ' + accountObj.lastName,  
                    email: accountObj.email, 
                    twoDFirstName: accountObj.twoDFirstName,
                    twoDLastName: accountObj.twoDLastName,
                    twoDEmail: accountObj.twoDEmail
                });
            }
        })
    }

const onChangeText = (e) => {
    let newAccountObj = Object.assign({}, accountObj);
    newAccountObj[e.target.id] = e.target.value;
    setAccountObj(newAccountObj)
}

const { getFieldDecorator } = props.form;
const { size } = props;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

  return (
    <div className="CreateAccount">
        <h3>Create Account</h3>

          <Form onSubmit={handleSubmit} className="CreateAccountForm">
              <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >

              <Divider orientation="left">Your Info</Divider>

                  <FormItem>
                      {getFieldDecorator('firstName', {
                          rules: [{ required: true, message: 'Please enter your first name' }],
                      })(
                          <Input onChange={onChangeText} placeholder="First Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('lastName', {
                          rules: [{ required: true, message: 'Please enter your last name' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Last Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please enter your email' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Email" type='email' />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please create a password' }],
                      })(
                          <Input onChange={onChangeText} placeholder="Create a Password" type='password' />
                          )}
                  </FormItem>

                  <Divider orientation="left">Your 2d's Info</Divider>

                  <FormItem>
                      {getFieldDecorator('twoDFirstName', {
                          rules: [{ required: true, message: "Please enter your 2d's first name" }],
                      })(
                          <Input onChange={onChangeText} placeholder="Your 2d's First Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('twoDLastName', {
                          rules: [{ required: true, message: "Please enter your 2d's last name" }],
                      })(
                          <Input onChange={onChangeText} placeholder="Your 2d's Last Name" />
                          )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('twoDEmail', {
                          rules: [{ required: true, message: "Please enter your 2d's email" }],
                      })(
                          <Input onChange={onChangeText} placeholder="Your 2d's Email" />
                          )}
                  </FormItem>

                  <p>Once you've created an account an email will be sent to your 2d asking them to join you on the 2d stat app!</p>

                  <FormItem>
                      <Button htmlType="submit">Log in</Button>
                      <br />
                  </FormItem>

              </Col>
          </Form>

    </div>
  );
}

const CreateAccount = Form.create()(CreateAccountForm);

export default CreateAccount; 