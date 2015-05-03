var express = require('express');
var app = express();

app.use(require('serve-static')(__dirname));

app.set('port', (process.env.PORT || 5000));

// respond to all requests
app.use(function(req, res, next) {
    if(req.method === 'POST'){
        var keys = '';
        
        var match = false;
        var fileToRead = "./mock/main";

        var index = req.url.indexOf('request.ajax');
        if (index >= 0) {
            match = true;
            path = req.url.slice(index + 'request.ajax?path='.length)
                .split('/').join('_');
        }

        //no match with the url, move along
        if (match == false) {
            return next();
        }

        var content = '';
        req.on('data', function (data) {
            // Append data.
            content += data;
        });

        req.on('end', function () {
            // Return the posted data.
            var allParams = content.split('&');
            for (var i = 0; i < allParams.length; i++) {
                if (allParams[i].indexOf('params') >= 0) {
                    var param = JSON.parse(
                        allParams[i].slice('params='.length)
                    );

                    var response = require(fileToRead).response;
                    
                    res.end(
                        JSON.stringify(
                            response[path] ? response[path](param) : {status: 500}
                        )
                    );
                    break;
                }
            }
        });

    } else {
        return next();
    }
});

app.listen(app.get('port'), function(){
    console.log('App listening on port ' + app.get('port'));
});