const nodemailer = require('nodemailer');
module.exports={
    sendMail(email,url)
    {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'plsslnlsit@gmail.com',
                   pass: 'plss@sit123'
               }
        });
        
        const mailOptions = {
            from: 'plsslnlsit@gmail.com',  // sender address
            to: email,  // list of receivers
            subject: 'link sent from nodemailer',  // Subject line
            text: 'click on the link '+url   
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }

}
