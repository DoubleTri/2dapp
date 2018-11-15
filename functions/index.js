const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const moment = require('moment');
var CronJob = require('cron').CronJob

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
        return;
    });

//-------------------------------------------------------------------------------------------

let weekEnding;

const caluculateStat = () => {
  console.log('calculateStat fired! Next calculation is on ' +  (Date.now() + 600000))
}

exports.stats = functions.firestore.document('users/{uid}')
  .onCreate((snap, context) => {
    // console.log("weekEnding " + snap.data().points.weekEnding + ' ' + moment(new Date(snap.data().points.weekEnding)).toString)
    weekEnding = Date.now() + 300000
    console.log("first " + (Date.now() + 300000))

    let job = new CronJob('0 */10 * * * *', () => {
      caluculateStat()
    });

    return job.start();
  })
