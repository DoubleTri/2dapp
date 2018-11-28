const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
admin.initializeApp(functions.config().firebase);

const nodemailer = require('nodemailer');
const moment = require('moment');
var cron = require('node-cron');

const emailData = require('./emailData');

exports.inviteEmail = functions.firestore.document('users/{uid}')
  .onCreate((snap, context) => {
        console.log("new user " + JSON.stringify(snap.data()))
        console.log("key " + context.params.uid)
        // console.log( "context", context.params.newUser )
        // return console.log('done ')

        // const emailAddresses = data.recipients
        const output = `
          <h2>Test Email</h2>
          <h5>This is an email</h5>
          <a href="http://localhost:3000/invite/${context.params.uid}">Invite Link Here</a>
          <p>testing testing testing...</p>
        `
      
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: emailData.email, // generated ethereal user
              pass: emailData.password  // generated ethereal password
          },
          tls:{
            rejectUnauthorized: false
          }
      });
      
      // setup email data with unicode symbols
      let mailOptions = 
        {
          from: '"2d Application"', // sender address
          to: snap.data().twoDEmail, // list of receivers
          subject: 'NodeMailer Test ',
          html: output // html body
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return console.log('success ' + JSON.stringify(info))
        });
        return true;
    })

//-------------------------------------------------------------------------------------------

// let scheduler = (item) => {
//   cron.schedule('*/2 * * * *', () => {
//     //console.log("FireStore data retrived " + JSON.stringify(snap.data()))
//     console.log('working...' + item)
//     change(item)
//   })
// }

let change = (item) => {

  const db = admin.firestore().collection('users').doc(item)
  let ready = false;

  db.get().then((doc) => {   
    console.log('starting step one... ' + JSON.stringify(doc.data()))

    if (doc.data().uids.length === 1) {
      console.log('waiting for partner')
    }else{
      db.update({
        'partnerA.pastPoints': doc.data().partnerA.pastPoints.concat({ [doc.data().weekEnding]: { pointTotal: doc.data().partnerA.points.pointTotal, points: doc.data().partnerA.points.points } }),
        'partnerA.points': {
          pointTotal: 0,
          points: []
        },
        weekEnding: doc.data().weekEnding + 50020
      })
    }
  // firebase.firestore.FieldValue.arrayUnion({ [doc.data().weekEnding]: {pointTotal : doc.data().partnerA.points.pointTotal, points: doc.data().partnerA.points.points } })
    return true
  }).then(() => {
    console.log('update successful ');
    return true
  }).catch((error) => {
    return console.log(error)
  })
}

exports.stats = functions.firestore.document('users/{uid}')
  .onCreate((snap, context) => {
    const key = context.params.uid

    console.log('starting!!!!!! 666666 6666666 ' )
    let uid = context.params.uid 
    change(uid)
    
    cron.schedule('*/2 * * * *', () => {
      console.log('working...' + uid)
      change(uid)
    })
    

    // console.log("weekEnding " + snap.data().points.weekEnding + ' ' + moment(new Date(snap.data().points.weekEnding)).toString)
    // every 3 days '0 0 */3 * *'
    // every 10 minutes '0 */10 * * * *'
    // '00 30 11 * * 1-5' - Runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday.
    return true;
  })

