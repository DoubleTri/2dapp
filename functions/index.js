const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');

const emailData = require('./emailData');

exports.invite = functions.database.ref('/users/{newUser}')
    .onCreate((snap, context) => {
        // console.log("new user " + JSON.stringify(snap.val()))
        // console.log( "context", context.params.newUser )
        // return console.log('done ')

        console.log('email address TO: ' + snap.child('twoDEmail').val())
        // const emailAddresses = data.recipients
        const output = `
          <h2>Test Email</h2>
          <h5>This is an email</h5>
          <a href="http://localhost:3000/invite/${snap.child('uid').val()}">Invite Link Here</a>
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
          to: snap.child('twoDEmail').val(), // list of receivers
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

