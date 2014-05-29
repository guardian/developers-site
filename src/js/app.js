import reqwest from 'github:ded/reqwest';
import ejs from 'npm:ejs';
import template from './template.ejs!github:systemjs/plugin-text';

function renderTemplate(template, options) {
    var renderedString = ejs.render(template, options);
    // EJS has a client-side mode (which I assume outputs a DOM element), but
    // it’s provided in a different file…
    var bin = document.createElement('div');
    bin.innerHTML = renderedString;
    return bin.childNodes[0];
}

reqwest({
    // TODO: Construct URL
    // TODO: API key
    url: 'http://content.guardianapis.com/search' +
        '?tag=info/developer-blog&page-size=3&show-fields=trailText&callback=?',
    type: 'jsonp'
}).then(function (response) {
    console.log(1, response.response.results);
    var renderedElement = renderTemplate(template, { articles: response.response.results });

    document.querySelector('#main-content-container').appendChild(renderedElement);
});