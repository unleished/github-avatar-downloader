var request = require('request');
var secrets = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
    }

  };

  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);

    //
    cb(err, contributors);

  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Result:", result);
if (err) {
  console.log("Errors:", err);
} else {
    for (var contributor of result) {
      console.log(contributor.avatar_url);
    }
  }
});