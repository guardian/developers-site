import objectFit from 'github:anselmh/object-fit/dist/polyfill.object-fit';
import objectFitCss from 'github:anselmh/object-fit/dist/polyfill.object-fit.css!github:systemjs/plugin-css';
import moment from 'moment';
import reqwest from 'github:ded/reqwest';
import ejs from 'npm:ejs';
// FIXME: Must be last. Why?
import template from '../enhanced-views/developer-blog-section.ejs!github:systemjs/plugin-text';

// Render the Developer Blog

function renderTemplate(template, options) {
    var renderedString = ejs.render(template, options);
    // EJS has a client-side mode (which I assume outputs a DOM element), but
    // it’s provided in a different file…
    var bin = document.createElement('div');
    bin.innerHTML = renderedString;
    return bin.childNodes[0];
}

function constructURLQueryParameters(map) {
    return Object.keys(map).map(function (key) {
        var value = map[key];
        return key + '=' + value;
    }).join('&');
}

var urlParameters = constructURLQueryParameters({
    'tag': 'info/developer-blog',
    'page-size': 3,
    'show-fields': 'trailText',
    'callback': '?'
});
var url = 'http://content.guardianapis.com/search?' + urlParameters;

reqwest({
    // TODO: API key
    url: url,
    type: 'jsonp'
}).then(function (response) {
    console.log(1, response.response.results);
    var renderedElement = renderTemplate(template, {
        articles: response.response.results,
        formatDate: function (dateString) {
            return moment(dateString).format('D MMM YYYY');
        }
    });

    var developerBlogSectionDropZone = document.querySelector('.developer-blog-section .drop-zone');
    developerBlogSectionDropZone.appendChild(renderedElement);
    developerBlogSectionDropZone.hidden = false;
});

// Polyfill CSS `object-fit` property

objectFit.polyfill({
    selector: '.main-image',
    // TODO: Why can't this be read from the CSS?
    fittype: 'cover'
});
