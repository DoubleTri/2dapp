const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.invite = functions.database.ref('/users/{newUser}')
    .onCreate((snap, context) => {
        console.log("new user " + JSON.stringify(snap.val()))
        console.log( "context", context.params.newUser )
        return console.log('done ')
    });