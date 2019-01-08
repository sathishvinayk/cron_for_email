'use strict'
const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config()
const fs = require('fs');
var location = "./images"
var GLOBAL_DATA = [];

(function readFile(){
    fs.readdir(location, function(err, files){
        if(err) {
            console.log("error appeard", err)
        }
        GLOBAL_DATA = files
        console.log(GLOBAL_DATA)
    })
}())

class Mailer {
    constructor(){
        this.from = process.env.MAIL_FROM_ID,
        this.to = process.env.MAIL_TO_ID
        this.old_date = moment("2018-10-31")
        this.data = GLOBAL_DATA
    }
    getRandomMessage(){ 
        let today = new Date(), m1 = moment(this.old_date), m2 = moment(today)
        let dif = Math.abs(m1.diff(m2, 'days'))
        return `Welcome jaju.. Happy Happy Happy morning.. Dont be scared inside... I am near you only... Today is your ${dif}th day... Waiting to hold you in my hands. Come soon...`
    }
    sendMail(){ 
        let random = Math.floor(Math.random() * 5)
        var message = {
            from: this.from,
            to: this.from,
            subject: `Manju + Raja = JAJU`,
            html: `
                <div>
                    <p> ${this.getRandomMessage()} </p>
                    <img src="cid:log" />
                </div>
            `,
            attachments: [{
                filename: this.data[random],
                path: __dirname + `/images/${this.data[random]}`,
                cid: 'log' 
            }]
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.from,
                pass: process.env.MAIL_PASS
            }
        })
        transporter.sendMail(message, (err,info)=>{
            if(err)
                console.log("Error appeared", err)
            else
                console.log("Mail sent", info);
        })
    }
}

setTimeout(() => {
    let mail = new Mailer()
    mail.sendMail()
},50)
