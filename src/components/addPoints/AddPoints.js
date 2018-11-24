import React, { useState, useEffect  } from 'react';
import { auth, fireStore } from '../../firebase';
import * as firebase from 'firebase';
import moment from 'moment';

import {  Form, Input, Button, Col, InputNumber } from 'antd';

const FormItem = Form.Item;

function AddPointsFormForm(props) {

const [pointObj, setPointObj] = useState(null);
const [pointTotal, setPointTotal] = useState(null);
const [twoDObj, setTwoDObj] = useState(null)

    useEffect(() => {
        fireStore.collection("users").where('uids', 'array-contains', auth.currentUser.uid).onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: false
        }, thisDocument => {
            let doc = thisDocument.docs[0].data()
            if (doc.partnerA.uid !== auth.currentUser.uid) {
                setTwoDObj(doc.partnerA)
            } else {
                setTwoDObj(doc.partnerB)
            }
        })
    }, [props.twoDObj]);


const handleSubmit = (e) => {
    e.preventDefault();

    let db = fireStore.collection("users").doc(props.id);
    let pointTotal;

    db.get().then(doc => {      
        pointTotal = doc.data()[props.partner].points.pointTotal + pointObj.value
    })
    
    .then(() => {
        var newPointTotal = props.partner + ".points.pointTotal";
        var pointTotalObj = {};
        pointTotalObj[newPointTotal] = pointTotal;
        db.update(pointTotalObj);

        var newPoints = props.partner + ".points.points";
        var newPointsObj = {};
        newPointsObj[newPoints] = firebase.firestore.FieldValue.arrayUnion({ value: pointObj.value, reason: pointObj.reason, date: Date.now() })
        db.update(newPointsObj);
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

    return (
        <div className="AddPoints">
            <h3>AddPoints</h3>

            <Form onSubmit={handleSubmit} className="login-form">

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
                        <Button htmlType="submit">Submit Points</Button>
                        <br />
                    </FormItem>

            </Form>
            {twoDObj ? 
            <div>
                <div id="pointTotalLine"><b>Total Points</b> (week ending {moment(props.weekEnding).calendar()} ) = <b>{twoDObj.points.pointTotal}</b></div>
                <br />
                {twoDObj.points.points.map((pointObj, i) => {
                    return <li className='pointEvent' key={i}><span id="pointTitleLine"><b>{pointObj.value} {pointObj.value > 1 ? 'Points' : 'Point'}</b> {moment(pointObj.date).calendar()} </span>
                        <br /> {pointObj.reason} <hr /></li>
                })}
            </div>
            : "Loading..." }
    
        </div>
    );
}

const AddPoints = Form.create()(AddPointsFormForm);

export default AddPoints; 