var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
    }
  };

  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);
    cb(err, contributors);
  });

  console.log('Image Downloaded!');
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if (err) {
    console.log("Errors:", err);
  } else {
      for (var contributor of result) {
        downloadImageByURL(contributor.avatar_url, './avatarImages/' + contributor.login + '.jpg');
    }
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}