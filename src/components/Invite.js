import React, { useState, useEffect  } from 'react';
import { db, auth, fireStore } from '../firebase'

import {  Form, Input, Button, Col } from 'antd';

const FormItem = Form.Item;

function InviteForm(props) {

const [accountObj, setAccountObj] = useState(); 

    useEffect(() => {
        fireStore.collection("users").doc(props.match.params.user).get().then(function(doc) {
            console.log("Document data:", doc.data());
        })
    }, {})

    const handleSubmit = (e) => {
        console.log('submitted')
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.form.resetFields()

                auth.createUserWithEmailAndPassword(accountObj.twoDEmail, accountObj.password).catch(function (error) {
                    alert(error.message)
                }).then(() => {
                    waitForCurrentUser()
                });

                async function waitForCurrentUser() {
                    try {
                        let uid = await auth.currentUser.uid;
                        if (uid) {
                            clearInterval(waitForCurrentUser);

                            db.child('users/' + auth.currentUser.uid).set({
                                email: accountObj.twoDEmail,
                                firstName: accountObj.twoDFirstName,
                                lastName: accountObj.twoDLastName,
                                name: accountObj.twoDFirstName + ' ' + accountObj.twoDLastName,
                                twoDEmail: accountObj.email,
                                twoDFirstName: accountObj.firstName,
                                twoDLastName: accountObj.lastName,
                                twoDName: accountObj.firstName + ' ' + accountObj.lastName,
                                twoDUid: props.match.params.user
                            });
                            db.child('users/' + props.match.params.user).update({
                                twoDEmail: accountObj.twoDEmail,
                                twoDUid: auth.currentUser.uid
                            })
                            console.log(auth.currentUser.uid)
                        }
                        else {
                            console.log('Wait for it');
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                    //  return userIdIs(uid);//returns promise
                };
            }
        })
    }

const onChangeText = (e) => {
    let newAccountObj = Object.assign({}, accountObj);
    newAccountObj[e.target.id] = e.target.value;
    setAccountObj(newAccountObj)
    console.log(newAccountObj)
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