// node 后端服务器 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet'); 
// var morgan = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cors({  
  origin: ['http://localhost:8080','http://localhost:8088'],
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']
}));

// app.use(morgan('common')); 
app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// 后端api路由
luckybuyApi = require('./api/luckybuyApi');
userApi = require('./api/userApi');
app.use('/api/luckybuy', luckybuyApi);
app.use('/api/users', userApi);

// 监听端口
// app.listen(3000);
app.set('port', 8088);
app.listen(8088);
console.log('success listen at port:8088......');