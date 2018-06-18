let xlsx = require('node-xlsx');
let fs = require('fs');

let obj = xlsx.parse(__dirname + '/old.xlsx');
let oldData = obj[0].data;


function trim(input) {
    let ans = input.replace(/^\s+|\s+$/g, "")
    return ans;
}
function run() {
    for (let i = oldData.length - 1; i >= 0; i--) {
        if (oldData[i][0] == '') {
            oldData.splice(i, 1)
        } else if (trim(oldData[i][0]) == '问答') {
            oldData[i][0] = 1;
        } else if (trim(oldData[i][0]) == '分享') {
            oldData[i][0] = 0;
        }
        trim(oldData[i][1])
        trim(oldData[i][3])
        trim(oldData[i][4])
    }
    writeInxlsx(oldData);
}


function writeInxlsx(data) {

    let buffer = xlsx.build([
        {
            name: 'sheet1',
            data,
        }]);
    fs.writeFileSync('new.xlsx', buffer, { 'flag': 'w' });

}
run()