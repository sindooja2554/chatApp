var urlShortner = require('../utility/urlShortener');
const mongoose = require('mongoose');

module.exports=
{
    shortURL(data,longURL,callback)
    {
        try
        {
            var urlCode  = urlShortner.shortUrl(longURL);
            let shortUrl = 'http://localhost:3000/#/' + urlCode;
            mailSender.sendMail(data.email,shortUrl);
        }
        catch(error)
        {
            console.log(error)
        }
    }
}
