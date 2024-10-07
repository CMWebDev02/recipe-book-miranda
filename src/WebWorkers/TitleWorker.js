addEventListener('message', ({data}) => {
    if (data.message == 'convertTitle') {
        convertToTitle(data.string, data.srcBool)
    }
})

function convertFromSRC(src) {
    let titleString = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
    titleString = titleString.match(/[\D|-]+/gi)
    titleString = titleString[0].replace(/[-]/gi, ' ')
    return titleString;
}

function convertToTitle(string, srcFlag) {
    let titleString = string;
    if (srcFlag) {
        titleString = convertFromSRC(titleString);
    }
    let titleStrings = titleString.split(' ')
    
    let finalTitle = titleStrings.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');

    postMessage({imageTitle: finalTitle});
}