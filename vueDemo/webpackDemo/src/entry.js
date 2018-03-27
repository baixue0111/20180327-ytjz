import css from './css/index.css';  // 引入css文件
import less from './css/black.less';  // 引入less
import nav from './css/nav.scss';  //引入scss
// import $ from 'jquery';

let newString = "Hello BaiXue！";
document.getElementById("title").innerHTML = newString; 

$("#title").html("Hello ChunJing!");

var json = require('../config.json');
document.getElementById("json").innerHTML ="name:" + json.name + "website:" + json.website;