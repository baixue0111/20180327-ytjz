var express = require('express');
var mhelper = require('../models/mhelper.js');
var _config=require('../common/_config');
var http = require('http');
var captchapng = require('captchapng');
var fs = require('fs');
var path = require('path');
var iCode=require('../common/identifyCode');
var uuid = require('node-uuid');  
var Redis = require('ioredis');
var querystring = require('querystring');

var router = express.Router();
var baeBosUrl = _config.fileuploadpath.defaultPath;
if (_config.isBaeBosUploadImages.isOpen) {
	baeBosUrl = _config.isBaeBosUploadImages.url;
}

/*获取用户基本信息*/
router.get('/getUser', function (req, res, next) {
	var offset = req.query.offset;
	var limit = req.query.limit;   
	var id = req.query.id;  
	var sql = "";
	sql+=" SELECT user_id,name as user_name,nick_name,sex,headimg  ";  
	sql+=" FROM user ";
	sql+=" WHERE user_id = "+id;    
	sql+= " LIMIT "+offset+","+limit; 

	mhelper.query(sql).then(function (results) {
		res.send(results[0]);
		res.end();
	});
});

router.get('/checkUserExsis', function (req, res, next) {
	var data = eval(req.body.userData); 
	var sql = "";
	sql+=" SELECT login_name  ";  
	sql+=" FROM login ";
	sql+=" WHERE login_name = "+data.user_name; 

	mhelper.query(sql).then(function (results) {
		var status = results[0].length >0 ;
		res.send({status:status});
		res.end();
	});
});

router.get('/getVCode', function (req, res, next) {
	var code = req.query.code;
	var redis = new Redis();
	// console.log('code='+code);
	redis.get(code).then(function (result) {
		console.log(result);
		var img = iCode.makeCapcha(result);
		res.setHeader('Content-Type', 'image/bmp');		
		res.end(img.getFileData());		   
	});	
});

router.get('/checkCaptchas', function (req, res, next) {
	var code = req.query.code;
	var redis = new Redis();
	redis.get(code).then(function (result) {
		res.send({code:result});	
		res.end();			   
	});	
});

router.post('/getCaptchas', function (req, res, next) {
	var icode = iCode.randCode();
	var sessionkey = uuid.v1();
	var sessionvalue = icode;
	// var sessionvalue = {code:icode,rand:Math.random()*1000};	
	var cookieExpires = _config.CookieExpires;
	var redis = new Redis();
	// console.log('sessionkey='+sessionkey);
	// console.log('sessionvalue='+sessionvalue);
	redis.set(sessionkey,sessionvalue);
	redis.expire(sessionkey,cookieExpires);
	// res.cookie(sessionkey, sessionvalue, { maxAge: cookieExpires, httpOnly: true }); //domain:goldbooknews.com	 
	res.send({code:sessionkey});	
	res.end();
    // req.write({code:sessionkey});
    // req.end();	
});



router.post('/login', function (req, res, next) {
	var data = eval(req.body.userData); 
	var username = data.userName;  
	var password = data.password;  
	var captcha_code = data.captcha_code; 	
	// console.log('username='+username);
	// console.log('password='+password);
	// console.log('captcha_code='+captcha_code);

	var sql = "";
	sql+=" SELECT l.login_id,l.login_name,l.login_state,l.user_type  ";  
	sql+=" ,u.user_id,u.name,u.nick_name,u.sex,u.birth_date,u.pcard,u.blood_type ";
	sql+=" ,u.mobile,u.qq,u.weibo,u.weixin,u.headimg,u.country "
	sql+=" FROM login l INNER JOIN `user` u ON l.user_id = u.user_id "
	sql+=" WHERE l.login_name ='"+username+"'"
	var sendData = {data:{},status:0,message:'登录用户【'+username+'】不存在，请您注册！'};	
	mhelper.query(sql).then(function (results) {
		if(results[0].length>0){
			sql+=" AND login_password = '"+password+"'"	
			mhelper.query(sql).then(function (results) {
		// console.log('data='+JSON.stringify(results[0]));
				if(results[0].length>0){
					sendData = {data:results[0][0],status:1,message:'用户名和密码正确的登录用户！'};
					res.send(sendData);	
					res.end();						
				}
				else{
					sendData = {data:{},status:2,message:'用户密码不正确，请重新输入！'};
					res.send(sendData);	
					res.end();									
				}
			});		
		}
		else{
			sendData = {data:{},status:0,message:'登录用户【'+username+'】不存在，请您注册！'};	
			res.send(sendData);	
			res.end();				
		}
	});
});

router.post('/reguser', function (req, res, next) {
	// var username = req.body.username;  
	// var password = req.body.password;  
	// var captcha_code = req.body.captcha_code;  
	// var mobi_code = req.body.mobi_code; 
	var data = eval(req.body.userData);
	var wData = {login_name:data.username};
	var jData = {password:data.password,captcha_code:data.captcha_code,mobi_code:data.mobi_code};
	mhelper.queryorinsert('login', wData, jData).then(function (results) {
		res.send({data: {login_id:results[0][0].dataValues.login_id},status: 1 });
		res.end();
	}).catch(function (error) {
		console.log(error.stack);
		res.send({status: 0, errormsg: error.stack});
		res.end();
	});	
});

router.post("/getMobileCode", function (req, res) {
	var data = eval(req.body.mbData);
	// console.log("data="+JSON.stringify(data));	
	// console.log("mob="+data.mob);
	// console.log("p1="+data.p1);
	var postData = {
		uid: 'XfXCFo6EMBSw',
		pas: 'edkp8e28',
		mob: data.mob,
		cid: 'e420xykRyd35',
		p1: data.p1,
		p2: '3',
		type: 'json'
	};
	var content = querystring.stringify(postData);
	var options = {
		host: 'api.weimi.cc',
		path: '/2/sms/send.html',
		method: 'POST',
		agent: false,
		rejectUnauthorized: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': content.length
		}
	};
	var req = http.request(options, function (res1) {
		res1.setEncoding('utf8');
        // console.log(res1);
        res1.on('data', function (chunk) {
            // console.log(chunk);
            res.send({status: chunk});
        });
        res1.on('error', function (e) {
        	console.log('problem with request: ' + e.message);
        });
        res1.on('end', function () {
        });
    });

	req.write(content);
	req.end();
});


module.exports = router;
