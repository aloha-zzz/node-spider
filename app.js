let cheerio = require('cheerio');
let fs = require('fs');
let https = require('https');
let xlsx = require('node-xlsx');


const page = 'https://cnodejs.org/?tab=all&page=';

let allAns = []

async function run() {
    for (let i = 1; i <= 92; i++) {
        await getInfo(page + i).then(handleData).catch(err => {
            console.log('err', err)
        })
    }
    console.log(allAns.length)
    writeInxlsx();
}

run();

function writeInxlsx() {

    let buffer = xlsx.build([
        {
            name: 'sheet1',
            data: allAns
        }]);
    fs.writeFileSync('old.xlsx', buffer, { 'flag': 'w' });
}

function getInfo(url) {
    return new Promise((resolve, reject) => {
        console.log('正在爬取--' + url);
        https.get(page, function (res) {
            let strHtml = '';
            res.on("data", function (chunk) {
                strHtml += chunk;
            })
            res.on("end", function () {
                resolve(strHtml);
            });
        }).on('error', () => {
            reject('false')
        })
    })
}



function handleData(html) {

    let $ = cheerio.load(html);
    let line = $('.cell');

    for (let i = 0; i < line.length; i++) {
        let lineData = [];
        lineData[0] = $('.topiclist-tab', line[i]).text()
        lineData[1] = $('.count_of_visits', line[i]).text()
        lineData[2] = $('.last_active_time', line[i]).text()
        lineData[3] = $('.topic_title', line[i]).text()
        lineData[4] = $('.count_of_replies', line[i]).text();
        lineData[5] = $('img', line[i]).attr().src;
        allAns.push(lineData);
    }

}
