'use strict';
/*
 http://docs.sequelizejs.com/en/latest/api/sequelize/
*/
var Sequelize=require('sequelize');

// exports.sequelize = function () {
// 	return new Sequelize('WqvXxKVXMXCVOeOWGUVt', '788b072672d84bd3bc64619118a3a5b5'
// 		, 'd3f8551743bd445db6451354ea924aae', {host:'sqld.duapp.com', port:4050 ,dialect:'mysql',timezone: '+08:00' });
// }

 exports.sequelize = function () {
 	return new Sequelize('gbook', 'root', 'pzcp-yzkj-6758', {host:'localhost', port:3306 ,dialect:'mysql',timezone: '+08:00' });
 }


// exports.sequelize = function () {
// 	return new Sequelize('gbook', 'root', '1111', {host:'localhost', port:3306 ,dialect:'mysql',logging:console.log});
// }


