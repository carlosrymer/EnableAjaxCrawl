/**
 * PhantomJS Service
 * @lastupdated 10.16.2013 crymer
 */

// Load some dependencies and define some variables
var page          = require('webpage').create(),
    system        = require('system'),
    lastReceived  = new Date().getTime(),
    requestCount  = 0,
    responseCount = 0,
    requestIds    = [],
    startTime     = new Date().getTime();

/**
 * Defines what should be done when a resource is received
 * @param object response The request response
 */
page.onResourceReceived = function (response)
{
    if(requestIds.indexOf(response.id) !== -1)
    {
        lastReceived = new Date().getTime();
        responseCount++;
        requestIds[requestIds.indexOf(response.id)] = null;
    }
}

/**
 * Defines what should be done when a resource is requested
 * @param object request The request
 */
page.onResourceRequested = function (request)
{
    if(requestIds.indexOf(request.id) === -1)
    {
        requestIds.push(request.id);
        requestCount++;
    }
};

// Open the page
page.open(system.args[1], function () {});

/**
 * Checks to see if we have fully loaded the page
 */
var isComplete = function ()
{
    if((new Date().getTime() - lastReceived > 300 && requestCount === responseCount) || new Date().getTime() - startTime > 5000)
    {
        clearInterval(checkCompleteInterval);
        console.log(page.content);
        phantom.exit();
    }
}

// Interval to check when rendering the page has finished
var checkCompleteInterval = setInterval(isComplete, 100);
