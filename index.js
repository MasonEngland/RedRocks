/**************************
  UMEA Counterfit web app
  Created by Mason England
  Nov 4, 2022
**************************/
const express = require('express');
const app = express();
const Datastore = require('nedb');
// set up the server to start listeing
// servs out of 'public' foler and supports json
app.listen(5555, () => console.log("Listening at 5555"));
//enables json and also serves webpage
app.use(express.static('public'));
app.use(express.json());
//sets up and loads the database
const accounts = new Datastore("accounts.db");
accounts.loadDatabase();
//The routh that cheks the authenticity of the request
app.post("/accounts", (req, res) => {
    const info = req.body;
    // querry the database using the entered username 
    accounts.find({uname: info.uname, pword: info.pword}, (error, data) => {
        // maybe there is a better way to do this?
        if (error != null) {
            console.log(error);
            res.end();
            return;
        }
        else if (data.length == 0) {
            res.json({
                status: "no"
            });
            return;
        }
        else {
            res.json({
                body: data[0],
                status: "yes"
            });
        }
    });
});
// not so simple route to send info to database
// double checks the username and email aren't taken
app.post("/post", (req, res) => {
    const info = req.body;
    // here to check if data can get in database
    let takenUname = false;
    let takenMail = false;
    // we use two querries to check username and email
    accounts.find({uname: info.uname}, (error, data) => {
        if (error != null) {
            console.log(error);
            res.end();
            return;
        } 
        else if (data.length != 0) {
            takenUname = true;
            res.send("taken uname");
            return;
        }
    });
    accounts.find({mail: info.mail}, (error, data) => {
        if (error != null) {
            console.log(error);
            res.end();
            return;
        }
        else if (data.length != 0) {
            takenMail = true;
            console.log(takenMail);
            res.send("taken email");
            return;
        }
        /* this works because by the time this function finishes
         * the other one has too
         */
        if (takenUname == false && takenMail == false) {
            accounts.insert(info);
        }
        res.end();
    });
});