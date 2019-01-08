const nodemailer = require('nodemailer');
const levelup = require('levelup')
const leveldown = require('leveldown')
require('dotenv').config()

class Mailer {
    constructor(){
        this.db = levelup(leveldown('./mydb'));
        this.from = process.env.MAIL_FROM_ID,
        this.to = process.env.MAIL_TO_ID
        this.data = new Date('10/31/2018')
    }
    getRandomMessage(){ 
        let val = this.getValue()
        setTimeout(() => {
            console.log(val)
        }, 2000)
        
        return `Welcome jaju.. Happy Happy Happy morning.. Dont be scared inside... I am near you only... Today is your ${this.day}th day... Waiting to hold you in my hands. Come soon`
    }
    sendMail(){ 
        var message = {
            from: this.from,
            to: this.to,
            subject: `Manju + Raja = JAJU`,
            html: `<p> ${this.getRandomMessage()} </p>`
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sathishvinayk@gmail.com',
                pass: '25091991@@Shiva'
            }
        })
        // transporter.sendMail(message, (err,info)=>{
        //     if(err)
        //         console.log(err)
        //     else
        //         console.log(info);
        // })
    }
}

let mail = new Mailer()
mail.sendMail()