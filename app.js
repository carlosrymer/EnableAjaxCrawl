
/**
 * Express app that handles rendering of SPA apps (such as one running on Angular) for Bots
 */

var express = require('express'),
	ejs     = require('ejs'),
	app 	= express();

// Set Port
app.set('port', process.env.PORT || 3000);

// Set General Configurations
app.engine('html', ejs.renderFile);
app.engine('css', ejs.renderFile);
app.engine('js', ejs.renderFile);
app.engine('png', ejs.renderFile);
app.engine('jpg', ejs.renderFile);
app.engine('gif', ejs.renderFile);

var getContent = function(url, callback)
{
  	var html = '',
  	  	phantom = require('child_process').spawn('phantomjs', ['server.js', url]);

  	// Set encoding to UTF8	  
  	phantom.stdout.setEncoding('utf8');
  
  	// Access logged output
  	phantom.stdout.on('data', function(d) {
    	html += d.toString();
  	});

  	// Execute callback on completion
  	phantom.on('exit', function(status) {
    	if(status !== 0)
    	{
      		console.log('An error occurred.');
    	}
    	else 
    	{
      		callback(html);
    	}
  	});
}

var snapshot = function (req, res)
{
	var url = 'http://' + req.headers['x-forwarded-host'] + (typeof req.query['_escaped_fragment_'] === 'string' ? req.query['_escaped_fragment_'] : req.params[0]);

	getContent(url, function (r) {
	    res.send(r);
	});
}

app.get(/(.*)/, snapshot);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
