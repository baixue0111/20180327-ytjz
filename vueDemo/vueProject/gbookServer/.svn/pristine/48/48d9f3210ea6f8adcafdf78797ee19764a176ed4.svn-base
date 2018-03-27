var mhelper = require('./mhelper');
/*
 //sql语句执行
 mhelper.query('select * from activity');

 //多记录查询
 var wherejson = {activity_id:3,activity_title:'第二次的亲密接触'};
 mhelper.queryall('activity',wherejson);

 //单记录查询
 mhelper.queryone('activity',wherejson);

 //插入
 var jsondata = {activity_title:'第二次的亲密接触',activity_state:1
 ,activity_progress:1,activity_uuid:'111aaabbbccc'};
 mhelper.insert('activity',jsondata);

 //先查询后插入
 var wherejson = {activity_title:'第三次的亲密接触'};
 var jsondata = {activity_title:'第三次的亲密接触',activity_state:1
 ,activity_progress:1,activity_uuid:'111aaabbbccc'};
 mhelper.queryorinsert('activity',wherejson,jsondata);

 //更新activity_title='第三次的亲密接触'的jsondata字段值
 var wherejson = {activity_title: '第三次的亲密接触'};
 var jsondata = {
 activity_title: '第四次的亲密接触', activity_state: 1
 , activity_progress: 1, activity_uuid: '111aaabbbccc'
 };
 mhelper.update('activity', wherejson, jsondata);

 //更新或插入单条记录 根据主键或外键匹配更新
 var jsondata = {
 activity_id: 9,
 activity_title: '第六次的亲密接触', activity_state: 1
 , activity_progress: 1, activity_uuid: '111aaabbbccc'
 };

 mhelper.updateone('activity', jsondata);

 //删除记录
 var wherejson = {activity_id:3};
 mhelper.delete('activity', wherejson);

//批量生成数据
 var arraydata = new Array({activity_title: '第七次的亲密接触', activity_state: 1, activity_progress: 1, activity_uuid: '111aaabbbccc'},{activity_title: '第八次的亲密接触', activity_state: 2, activity_progress: 1, activity_uuid: '111aaabbbccc'});
 mhelper.bulkupdate('activity', arraydata);



 */


// var wherejson = {activity_id: 5};
// var jsondata = {
//     activity_id: 9,
//     activity_title: '第六次的亲密接触', activity_state: 1
//     , activity_progress: 1, activity_uuid: '111aaabbbccc'
// };

// var arraydata = new Array({activity_title: '第七次的亲密接触', activity_state: 1, activity_progress: 1, activity_uuid: '111aaabbbccc'},{activity_title: '第八次的亲密接触', activity_state: 2, activity_progress: 1, activity_uuid: '111aaabbbccc'});
// mhelper.bulkupdate('activity', arraydata);


var Sequelize = require('sequelize');
var sequelize = new Sequelize('gbook', 'root', '1111', {host: 'localhost', port: 3306});
var Activity = sequelize.import('./activity.js');
//Activity.create(jsondata,{logging:true});
//console.log(Activity.rawAttributes);
// console.log(Activity.rawAttributes.activity_title);
// console.log(Activity.rawAttributes.activity_title.field);
//console.log(Activity.sum('activity_id'));