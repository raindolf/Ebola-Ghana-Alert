// JavaScript Document
// ver-1.1.0 update 2013-01-30

//Url to template.
//Your domain name must specify http://
//If the template is in the directory, need specify,
//for example http://mysite.com/subfolder1/subfolder2
var urlToSite = 'http://ebolaghanaalert.org';

//Date of opening of the site
var dateOpen = {
    utc : 180, //+UTC value in minutes
    year : 2014, //full format YYYY
    month : 9, //value from 1 to 12
    day : 11, //value from 1 to 31
    hour : 10, //value from 0 to 23
    minutes : 00 //value from 0 to 59
};

//Settings for twitter
var tweetCount = 10; //number of recent messages
var tweetUserName = 'raindolf'; //twitter user name