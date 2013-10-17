Enable AJAX Crawl
=================

If your site relies heavily on JavaScript to render content on a page, you may be thinking about how you to make sure that search engines like Google's can crawl all the content on a given page. By default, crawlers do not run JavaScript when they hit a page, and so if you have any content loaded using JavaScript (such as through AJAX or templating frameworks like Angular), you will have a problem. Fortunately, search engines allow you to specify where to get the content for a given URL so it can index the entire page's content. You can read the full specification [here](https://developers.google.com/webmasters/ajax-crawling/docs/specification).

This tool allows you to create an [Express](http://expressjs.com/) server (it could sit on the same server as your site) that will run [PhantomJS](http://phantomjs.org/) when a search engine bot hits your page and render the fully loaded page.

Requirements
------------

* NodeJS (w/ NPM)
* PhantomJS

Installation
------------

*	Clone the repository into a project folder of your choice and run npm install on it (this will install Grunt, Express and some other modules needed to test).
*   Run bower install on the folder as well. You should only have Modernizr in your bower list (run bower list).
*	Install PhantomJS on the server from where you want to run the tool. If you are using a Mac, you can use Homebrew (brew install phantomjs).
*	Have two terminals open or start the Express app using a tool like Forever (bundled in the package.json). Run "node app" or "forever start app.js" to get the Express app going.
*	If you are using Grunt, run grunt server and you can start testing (by using ?_escaped_fragment=*).
*	If you want to test with Apache, run grunt build and copy the resulting dist files to your Apache server (including the .htaccess file). 
*	If you want to run the Express server elsewhere, just change its configurations to point to the host and port of interest. You would also have to update the .htaccess file.
