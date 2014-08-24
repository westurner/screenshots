

var fs = require('fs');
//var path = require('path');
var Page = require('webpage');

/* <items> */
var username = 'westurner';
var items = [
{
    'key': username + '_github_monthly',
    'args': {
        'title': '',
        'username': username,
        'dest': '',
        'url': "https://github.com/" + username + "?tab=contributions&period=monthly",
    },
},
{
    'key': username + '_github_io',
    'args': {
        'title': '',
        'username': username,
        'dest': '',
        'url': 'https://' + username + '.github.io/',
    }
}
]
/* </items> */



var getScreens = function(key, args, configurePage) {
    var dt = new Date(); 

    var filename = key + '__' + dt.toISOString() + '.png';

    var dest = args.dest;
    if (!dest) dest = '.';

    // TODO: fs.mkdir(dest);

    var filepath = args.dest + '/' + filename;
    // TODO: var filepath = path.join(dest, filename);

    /* Create a PhantomJS page */
    var page = require('webpage').create();

    if (configurePage) {
        configurePage(page, args);
    }

    page.open(args.url, function() {
        page.render(filepath);

        var pageData = {
            'url': page.url,
            'content': page.content,
            'title': page.title,
            'plainText': page.plainText,

            'viewportSize': page.viewportSize,
            'scrollPosition': page.scrollPosition,
            'zoomFactor': page.zoomFactor,
            'paperSize': page.paperSize,
        };
    });
}

var configurePageRegular = function(page, args) {
    if (args.page) {
        if (args.page.viewportSize) {
            page.viewportSize = args.page.viewportSize;
        }
        if (args.page.zoomFactor) {
            page.zoomFactor = args.page.zoomFactor;
        }
        if (args.page.scrollPosition) {
            page.scrollPosition = args.page.scrollPosition;
        }
    }
}

var generateScreens = function(items) {
    for (i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        getScreens(item.key, item.args, configurePageRegular);
    }
};

var main = function(items) {
    items = items;
    generateScreens(items)
    phantom.exit();
}

main(items);
