'use strict';

/**
 *
 * Author: Andrew Puch
 *
 * Description: In this simple example we are going to parse the RSS feed for 
 * AWS EC2 East and return the first item in the feeds title. We will console 
 * log out the content so that the lambda logs can show the respose.
 *
 */

var request = require('request'),
    xml     = require('xml2js').parseString;

exports.rss = function(event, context, callback) {
    request('http://status.aws.amazon.com/rss/ec2-us-east-1.rss', function (error, response, body) {
        if(!error && response.statusCode == 200) {
            xml(body, { trim : true }, function (err, result) {
                if(err) {
                    console.log("Error parsing data.");

                    return;
                }

                var content = "\n\nAWS EC2 us-east-1\n";
                content = content + "-----------------\n";
                content = content + result.rss.channel[0].item[0].title[0]._+ "\n";

                console.log(content);

                return;
            });
        } else {
            console.log("Error receiving data.");
        }
    });
};