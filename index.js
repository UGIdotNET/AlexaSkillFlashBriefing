let Parser = require('rss-parser');

exports.handler = async (event, context, callback) => {
    let parser = new Parser();
    let feed = await parser.parseURL('http://www.ugidotnet.org/news/rss');

    let flashBriefingFeedItems = feed.items
        .slice(0, 5)
        .map((currentValue, index, array) => {
            return {
                uid: currentValue.guid.trim(),
                updateDate: currentValue.isoDate,
                titleText: currentValue.title.trim(),
                mainText: currentValue.title.trim()
            };
        });

    let flashBriefingFeedResponse = {
        statusCode: 200,
        body: JSON.stringify(flashBriefingFeedItems)
    };

    callback(null, flashBriefingFeedResponse);
};
