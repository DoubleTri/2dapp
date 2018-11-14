import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { auth, fireStore } from '../firebase'

import {  Form, Input, Button, Col, Divider, Select, TimePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

function CreateAccountForm(props) {

const [accountObj, setAccountObj] = useState({ 
    firstName: null, 
    lastName: null, 
    email:null, 
    password: null,
    twoDFirstName: null,
    twoDLastName: null,
    twoDEmail: null,
    twoDUid: null,
    points: { weekEnding: null, points: []}
 });
 const [uid, setUid] = useGlobal('uid') 

    useEffect(() => {
        props.form.setFieldsValue({
            time: moment('24:00', 'hh:mm a')
        })
    }, {}) 

    var date = new Date();
    var today = date.getDay();
    var dayPicked = 1;
    var timePicked;
    var weekEnding;
    // var choosenDay = () => {if(dayPicked > today) {
    //     return (today + 7) - dayPicked
    //     } else {
    //         return today - dayPicked
    //     }
    // }

    if(dayPicked < today){
        weekEnding = new Date().setDate(date.getDate() - (today - dayPicked));
        console.log(moment(weekEnding).toString() + ' Next week ending... ' + moment(new Date().setDate(date.getDate() - (today - dayPicked)) + 604800000).toString())
        console.log("hours " + weekEnding.getHours())
    }
    else{
        weekEnding = moment(new Date().setDate(date.getDate() - dayPicked));
        console.log(weekEnding.toString() + ' Next week ending... ' + moment(new Date().setDate(date.getDate() - (today - dayPicked)) + 604800000).toString())
        console.log("hours " + weekEnding.getHours())
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {

                props.form.resetFields()

                auth.createUserWithEmailAndPassword(accountObj.email, accountObj.password).catch(function (error) {
                    alert(error.message)
                }).then(() => {
                    waitForCurrentUser()
                });

                async function waitForCurrentUser() {
                    try {
                        let uid = await auth.currentUser.uid;
                        if (uid) {
                            clearInterval(waitForCurrentUser);

                            fireStore.collection("users").doc(auth.currentUser.uid).set({
                                email: accountObj.email,
                                firstName: accountObj.firstName,
                                lastName: accountObj.lastName,
                                name: accountObj.firstName + ' ' + accountObj.lastName,
                                twoDEmail: accountObj.twoDEmail,
                                twoDFirstName: accountObj.twoDFirstName,
                                twoDLastName: accountObj.twoDLastName,
                                twoDName: accountObj.twoDFirstName + ' ' + accountObj.twoDLastName,
                                twoDUid: null,
                                points: { weekEnding: accountObj.points.weekEnding, points: []}
                            })
                            .catch(function(error) {
                                console.error("Error adding document: ", error);
                            });
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
}

const onChangeSelect = (e) => {
    let newAccountObj = Object.assign({}, accountObj);
    newAccountObj.points.weekEnding = e
    setAccountObj(newAccountObj)
}

const onChangeTime = (e) => {
    console.log(moment(e).toString())
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
                      {getFieldDecorator('weekEnding', {
                          rules: [{ required: true, message: 'Please select when you would like your week to end' }],
                      })(
                          <Select
                              onChange={onChangeSelect}
                          >
                              <Select.Option value={0}>Sunday</Select.Option>
                              <Select.Option value={1}>Monday</Select.Option>
                              <Select.Option value={2}>Tuesday</Select.Option>
                              <Select.Option value={3}>Wednesday</Select.Option>
                              <Select.Option value={4}>Thursday</Select.Option>
                              <Select.Option value={5}>Friday</Select.Option>
                              <Select.Option value={6}>Saturday</Select.Option>
                          </Select>,
                      )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('time', {
                          rules: [{ required: true, message: 'Please enter your email' }],
                      })(
                        <TimePicker use12Hours minuteStep={30} onChange={onChangeTime} format='hh:mm a' />
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
                      <Button htmlType="submit">Create Account</Button>
                      <br />
                  </FormItem>

              </Col>
          </Form>

    </div>
  );
}

const CreateAccount = Form.create()(CreateAccountForm);

export default CreateAccount; 