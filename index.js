const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config()
const fs = require('fs');
const path = require('path');
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
        let today = new Date(),
        m1 = moment(this.old_date), m2 = moment(today)
        let dif = Math.abs(m1.diff(m2, 'days'))
        console.log(dif)
        return `Welcome jaju.. Happy Happy Happy morning.. Dont be scared inside... I am near you only... Today is your ${dif}th day... Waiting to hold you in my hands. Come soon`
    }
    sendMail(){ 
        let random = Math.floor(Math.random() * 6)
        console.log(this.data[random])
        var message = {
            from: this.from,
            to: this.from,
            subject: `Manju + Raja = JAJU`,
            html: `
                <div>
                    <p> 
                        ${this.getRandomMessage()} 
                    </p>
                    <img src="cid:log" />
                </div>
            `,
            attachments: [{
                // filename: '1.png',
                // path: __dirname + '/images/1.png',
                // cid: 'log' //same cid value as in the html img src
                filename: this.data[random],
                path: __dirname + `/images/${this.data[random]}`,
                cid: 'log' //same cid value as in the html img src
            }]
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_FROM_ID,
                pass: process.env.MAIL_PASS
            }
        })
        transporter.sendMail(message, (err,info)=>{
            if(err)
                console.log(err)
            else
                console.log(info);
        })
    }
}

setTimeout(() => {
    let mail = new Mailer()
    mail.sendMail()
},20)
