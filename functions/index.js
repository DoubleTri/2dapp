const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.invite = functions.database.ref('/users/{newUserLastname}')
.onCreate((snap, context) => {
    console.log('worked.... ' + snap)
});
