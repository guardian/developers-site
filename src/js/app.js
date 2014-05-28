import reqwest from 'github:ded/reqwest';

reqwest({
    // TODO: Construct URL
    url: 'http://content.guardianapis.com/search?tag=info/developer-blog&page-size=3&show-fields=trailText&callback=?',
    type: 'jsonp'
}).then(function (response) {
    console.log(1, response.response.results);
});
