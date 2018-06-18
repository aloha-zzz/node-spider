let xlsx = require('node-xlsx');
let fs = require('fs');

let obj = xlsx.parse(__dirname + '/new.xlsx');

let clusterMaker = require('clusters');
let data = obj[0].data;
let dataArr = [];
data.map(item => {
    let temp = [];
    temp[0] = item[0];
    temp[1] = Number(item[1])
    temp[2] = Number(item[4])
    dataArr.push(temp)
})
// console.log(dataArr);
//开始时间

clusterMaker.k(5);
clusterMaker.iterations(100);
clusterMaker.data(dataArr)

let date1 = new Date();
let ans = clusterMaker.clusters();
ans.map(item => {
    console.log(item.centroid)
})
let date2 = new Date();    //结束时间
let date3 = date2.getTime() - date1.getTime()
console.log(date3);