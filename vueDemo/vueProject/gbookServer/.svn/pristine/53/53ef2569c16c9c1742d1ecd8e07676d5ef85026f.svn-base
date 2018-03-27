'use strict';
var sequelize = require('./_database').sequelize();

var User = sequelize.import('./user.js');
var Country = sequelize.import('./country.js');
var Area = sequelize.import('./area.js');
var Province = sequelize.import('./province.js');
var City = sequelize.import('./city.js');
var Region = sequelize.import('./region.js');
var Popedom = sequelize.import('./popedom.js');
var Book = sequelize.import('./book.js');
var Login_Info = sequelize.import('./login_info.js');
var Activity = sequelize.import('./activity.js');
var Activity_Detail = sequelize.import('./activity_detail.js');
var Activity_Prize = sequelize.import('./activity_prize.js');
var Activity_Prize_Detail = sequelize.import('./activity_prize_detail.js');
var Activity_Get_Prize = sequelize.import('./activity_get_prize.js');
var Activity_Partake = sequelize.import('./activity_partake.js');
var Activity_Partake_Detail = sequelize.import('./activity_partake_detail.js');
var Activity_Questions = sequelize.import('./activity_questions.js');
var Activity_Seat = sequelize.import('./activity_seat.js');
var Prizerule = sequelize.import('./prizerule.js');
var Prizerule_Detail = sequelize.import('./prizerule_detail.js');
var ConstGroupSet = sequelize.import('./constgroupset.js');
var Sponsor = sequelize.import('./sponsor.js');
var Wechat_Login_Info = sequelize.import('./wechat_login_info.js');
var Login = sequelize.import('./login.js');
var Adviertisement = sequelize.import('./adviertisement.js');
var Adviertisement_Relevance = sequelize.import('./adviertisement_relevance.js');
var Webmenu = sequelize.import('./webmenu.js');
var Articles = sequelize.import('./articles.js');
var Tags = sequelize.import('./tags.js');
var Tags_Record = sequelize.import('./tags_record.js');
var Prize_Distribute = sequelize.import('./prize_distribute.js');
var Prize_Distribute_Award = sequelize.import('./prize_distribute_award.js');
var Prize_Distribute_Affiche = sequelize.import('./prize_distribute_affiche.js');
var SysAccount = sequelize.import('./sysaccount.js');
var Prize_Distribute_Plan = sequelize.import('./prize_distribute_plan.js');
var Prize_Investigation = sequelize.import('./prize_investigation.js');
var Prize_Investigation_Questions = sequelize.import('./prize_investigation_questions.js');
var User_Advice = sequelize.import('./user_advice.js');
var Wechat_User_Info = sequelize.import('./wechat_user_info.js');
var Prizeissue_Info = sequelize.import('./prizeissue_info.js');
var Luck_Activity_List = sequelize.import('./luck_activity_list.js');
var Luck_User_Order = sequelize.import('./luck_user_order.js');
var Luck_User_Order_Detail = sequelize.import('./luck_user_order_detail.js');
var Sys_Payment_Mode = sequelize.import('./sys_payment_mode.js');
var User_Invoice = sequelize.import('./user_invoice.js');
var User_Receipt_Address = sequelize.import('./user_receipt_address.js');
var Luck_Shopping_Cart = sequelize.import('./luck_shopping_cart.js');
var Luck_Bask_Order = sequelize.import('./luck_bask_order.js');
var Luck_Bask_Order_Images = sequelize.import('./luck_bask_order_images.js');
var Luck_Prize_Affiche = sequelize.import('./luck_prize_affiche.js');
var Luck_Prize_Time_Record = sequelize.import('./luck_prize_time_record.js');
var Messages = sequelize.import('./messages.js');
var Sys_Goods_Class = sequelize.import('./sys_goods_class.js');
var Drs_Resources = sequelize.import('./drs_resources.js');
var Sys_File_Mime = sequelize.import('./sys_file_mime.js');
var Drs_Image_Resources = sequelize.import('./drs_image_resources.js');
var Drs_Audios_Resources = sequelize.import('./drs_audios_resources.js');
var Drs_Control_Resources = sequelize.import('./drs_control_resources.js');
var Sys_Html_Template = sequelize.import('./sys_html_template.js');
var Info_Comment = sequelize.import('./info_comment.js');


/*-----------------新定义表在models/index.js注册后需要同时在上面行注册-----------------*/


/*查询多个实例（多条数据）*/
exports.queryall = function queryall(modelname, wherejson) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.findAll({where: wherejson})]);
    }

    return null;
}

/*查询单个实例（单条数据）*/
exports.queryone = function queryone(modelname, wherejson) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.findOne({where: wherejson})]);
    }

    return null;
}

/*执行原始SQL语句进行查询*/
exports.query = function querydata(sqlString) {
    return sequelize.query(sqlString);
}

/*执行非查询sql*/
exports.executenonquery = function executenonquery(sqlString) {
    return sequelize.query(sqlString);
}


/*返回count记录数*/
exports.getquerycount = function getquerycount(sqlString) {
    return sequelize.query("SELECT COUNT(*) AS cnt FROM ("+sqlString+") AS xt ");
}


/*构建一个新的模型实例，并进行保存*/
exports.insert = function insertdata(modelname, jsondata) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.create(jsondata, [{logging: false}])]);
    }

    return null;
}

/*查找一行记录，如果不存在则创建实例并保存到数据库中*/
exports.queryorinsert = function queryorinsert(modelname, wherejson, jsondata) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.findOrCreate({where: wherejson, defaults: jsondata})]);
    }

    return null;
}

/*更新所匹配的多个实例*/
exports.update = function updatedata(modelname, wherejson, jsondata) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.update(jsondata, {where: wherejson, validate: false})]);
    }

    return null;
}

/*删除多个实例*/
exports.delete = function deletedata(modelname, wherejson) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.destroy({where: wherejson})]);
    }

    return null;
}

/*创建或更新一行。如果匹配到主键或唯一约束键时会进行更新 数据表中有必填字段必须填写否则操作失败*/
exports.updateone = function upsertdata(modelname, jsondata) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.upsert(jsondata, {validate: false})]);
    }

    return null;
}

/*批量创建并保存多个实例 数据表中有必填字段必须填写否则操作失败*/
exports.bulkinsert = function bulkCreatedata(modelname, arraydata) {
    var mdefine = sequelize.model(modelname);
    if (sequelize.isDefined(modelname)) {
        return Promise.all([mdefine.bulkCreate(arraydata)]);
    }

    return null;
}
