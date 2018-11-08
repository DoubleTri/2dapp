import React, { useState, useEffect  } from 'react';
import { db, auth } from '../firebase'

import {  Form, Input, Button, Select, message, Tooltip, Icon, notification, Col, InputNumber, Divider } from 'antd';
import { accessSync } from 'fs';

const FormItem = Form.Item;

function InviteForm(props) {

const [accountObj, setAccountObj] = useState(); 

    // db.child("users/" + props.match.params.user).once("value", function (snap) {
    //     console.log(snap.val())
    //     props.form.setFieldsValue({
    //         email: snap.child('twoDEmail').val()
    //     })
    // })

    useEffect(() => {
        db.child("users/" + props.match.params.user).once("value", function (snap) {
            setAccountObj(snap.val())
            props.form.setFieldsValue({
                twoDEmail: snap.child('twoDEmail').val()
            })            
        })
    }, {})

    const handleSubmit = (e) => {
        console.log('submitted')
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.form.resetFields()

                auth.createUserWithEmailAndPassword(accountObj.twoDEmail, accountObj.password).catch(function (error) {
                    alert(error)
                });

                db.child('users/' + props.match.params.user).update({
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
      <div className="CreateInvite">
          <h3>Invite</h3>

          <Form onSubmit={handleSubmit} className="CreateInviteForm">
              <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >

                  <FormItem>
                      {getFieldDecorator('twoDEmail', {
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
                  <FormItem>
                      <Button htmlType="submit">{accountObj ? "Join " + accountObj.firstName : "loading..."}</Button>
                      <br />
                  </FormItem>

              </Col>
          </Form>

      </div>
  );
}

const Invite = Form.create()(InviteForm);

export default Invite; 