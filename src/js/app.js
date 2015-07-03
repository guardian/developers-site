import moment from 'moment';
import reqwest from 'reqwest';
import ejs from 'ejs';
// FIXME: Must be last. Why?
import template from '../enhanced-views/developer-blog-section.ejs!text';

// Render the Developer Blog
function renderTemplate(template, options) {
    var renderedString = ejs.render(template, options);
    // EJS has a client-side mode (which I assume outputs a DOM element), but
    // it’s provided in a different file…
    var bin = window.document.createElement('div');
    bin.innerHTML = renderedString;
    return bin.childNodes[0];
}

function constructURLQueryParameters(map) {
    return Object.keys(map).map(key => key + '=' + map[key]).join('&');
}

var urlParameters = constructURLQueryParameters({
    'tag': 'info/developer-blog',
    'page-size': 3,
    'show-fields': 'trailText',
    'api-key': '85nszu4nbfdzh2zrakh74k2w',
    'callback': '?'
});
var url = 'http://content.guardianapis.com/search?' + urlParameters;

function transcludeDeveloperBlog() {
    reqwest({
        // TODO: API key
        url: url,
        type: 'jsonp'
    }).then(response => {
        var renderedElement = renderTemplate(template, {
            articles: response.response.results,
            formatDate: dateString => moment(dateString).format('D MMM YYYY')
        });

        var developerBlogSectionDropZone = window.document.querySelector('.developer-blog-section .drop-zone');
        developerBlogSectionDropZone.appendChild(renderedElement);
        developerBlogSectionDropZone.hidden = false;
    });
}

switch(window.location.pathname) {
    case '/' :
        transcludeDeveloperBlog();
        break;
    default:
        break;
}
