import React, { useState, useEffect  } from 'react';
import { db } from '../../firebase'

import {  Form, Input, Button, Select, message, Tooltip, Icon, notification, Col, InputNumber } from 'antd';

const FormItem = Form.Item;

function AddPointsFormForm(props) {

  const [pointObj, setPointObj] = useState(null);
  console.log(props.twoDUid) 

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

    db.child('users/' + props.twoDUid + '/points').push({
 
        value: pointObj.value,
        reason: pointObj.reason
        
    })
    props.form.resetFields()
}

const onChangeText = (e) => {
    let newPointObj = Object.assign({}, pointObj);
    newPointObj[e.target.id] = e.target.value;
    setPointObj(newPointObj)
}

const onChangeSelect = (e) => {
    let newPointObj = Object.assign({}, pointObj);
    newPointObj.value = e;
    setPointObj(newPointObj)
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
        <div className="AddPoints">
            <h3>AddPoints</h3>

            <Form onSubmit={handleSubmit} className="login-form">
                <Col xs={{ span: 20, offset: 2 }} sm={{ span: 12, offset: 6 }} style={{ marginTop: '5em' }} >

                    <FormItem>
                        {getFieldDecorator('points', {
                            rules: [{ required: true, message: 'Please enter your email.' }],
                        })(
                            <InputNumber min={0} max={10} onChange={onChangeSelect} />
                            )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: 'Please enter the reason for awarding the points.' }],
                        })(
                            <Input onChange={onChangeText} placeholder="Reason" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit">Log in</Button>
                        <br />
                    </FormItem>

                </Col>
            </Form>

        </div>
    );
}

const AddPoints = Form.create()(AddPointsFormForm);

export default AddPoints; 