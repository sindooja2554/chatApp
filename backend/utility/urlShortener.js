var validUrl = require('valid-url');
var shortId  = require('shortid');
module.exports =
{ 
    shortUrl(url){
    if(!validUrl.isUri(url))
    {
        return "Invalid Base Url"
    }
    else
    {
        const urlCode = shortId.generate();
        return urlCode
    }        
}
}


// var uri = "https://www.google.com/search?q=regex+for+firstname+in+js&oq=regex+for+firstname+in+js&aqs=chrome..69i57j0l2j69i60.1037j1j7&sourceid=chrome&ie=UTF-8"

// var op = shortUrl(uri)
// console.log(op)