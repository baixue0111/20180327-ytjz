import fetch from '../config/fetch'

/*获取幸运购菜单*/
var luckybuyMenu = () => fetch('GET', '/api/luckybuy/getMenu', {
		// type: 'guess'
	});

/*获取幸运购首页轮播广告*/
var luckybuyAd = () => fetch('GET', '/api/luckybuy/getLuckAd', {
	offset:0,
	limit:5,
});

/*获取幸运购首页即将期满*/
var readyLotteryAdver = () => fetch('GET', '/api/luckybuy/getAdver', {
	offset:0,
	limit:10,
});

/*获取幸运购新闻公告*/
var luckybuyMessages = () => fetch('GET', '/api/luckybuy/getLuckMessages', {
	offset:0,
	limit:4,
});

/*获取幸运购最新中奖*/
var luckybuyPrizeAffiche = () => fetch('GET', '/api/luckybuy/getPrizeAffiche', {
	offset:0,
	limit:10,
});

/*获取幸运购最新揭晓*/
var luckybuyNewestAnnounce = () => fetch('GET', '/api/luckybuy/getNewestAnnounce', {
	offset:0,
	limit:5,
});

/*获取幸运购最新揭晓-更多*/
var luckybuyNewestAnnounceMore = (page,limit) => fetch('GET', '/api/luckybuy/getNewestAnnounceMore', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :20),
});

/*获取幸运购最新揭晓-最快揭晓*/
var luckybuyNewestAnnounceFastest = (page,limit) => fetch('GET', '/api/luckybuy/getNewestAnnounceFastest', {
	page:(page!=null ? page :1),
	limit:2,
});

/*获取幸运购热门推荐-首页*/
var luckybuyHotRecommendation = () => fetch('GET', '/api/luckybuy/getHotRecommendation', {
	offset:0,
	limit:8,
});

/*获取幸运购热门推荐-更多*/
var luckybuyHotRecommendationMore = (page,limit,filterkey) => fetch('GET', '/api/luckybuy/getHotRecommendationMore', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :20),
	filterkey:filterkey
});

/*获取幸运购新品上架*/
var luckybuyNewArrivals= () => fetch('GET', '/api/luckybuy/getNewArrivals', {
	offset:0,
	limit:10,
});

/*获取幸运购新品上架-更多*/
var luckybuyNewArrivalsMore = (page,limit,filterkey) => fetch('GET', '/api/luckybuy/getNewArrivalsMore', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :20),
	filterkey:filterkey
});

/*获取幸运购晒单分享*/
var luckybuyBaskSharing= () => fetch('GET', '/api/luckybuy/getLuckBaskSharing', {
	offset:0,
	limit:5,
});

/*获取幸运购晒单分享-更多*/
var luckybuyBaskSharingMore = (page,limit) => fetch('GET', '/api/luckybuy/getLuckBaskSharingMore', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :20),
});

/*获取幸运购正在云购*/
var luckybuyShoppingMsg= () => fetch('GET', '/api/luckybuy/getShoppingMsg', {
	offset:0,
	limit:100,
});

/*图书详情页面封面小图*/
var luckybuyBookCover= (luck_activity_list_id) => fetch('GET', '/api/luckybuy/getBookCover', {
	offset:0,
	limit:1,
	id:luck_activity_list_id
});

/*获取user信息*/
var userInfo= (user_id) => fetch('GET', '/api/users/getUser', {
	offset:0,
	limit:1,
	id:user_id
});

//验证登录
var accountLogin = (userData) => fetch('POST', '/api/users/login', {
	userData:userData
});

/*用户注册*/
var regUser = (userData) => fetch('POST', '/api/users/reguser', {
	userData:userData
});

var checkUserExsis = (userData) => fetch('GET', '/api/users/checkUserExsis', {
	userData:userData
});

/*图片验证码*/
var vCode = (code) => fetch('GET', '/api/users/getVCode', {
	code:code
});

/*生成图片随机数*/
var getCaptchas = () => fetch('POST', '/api/users/getCaptchas', {});

/*验证图片随机数*/
var checkCaptchas = (code) => fetch('GET', '/api/users/checkCaptchas', {
		code:code
});

/*手机验证码*/
var getMobileCode = (mbData) => fetch('POST', '/api/users/getMobileCode', {
	mbData: mbData
});

/*图书详情页面数据*/
var luckybuyActivityBookDetail= (luck_activity_list_id) => fetch('GET', '/api/luckybuy/getActivityBookDetail', {
	offset:0,
	limit:1,
	id:luck_activity_list_id
});

/*获取图书详情页面-参与记录*/
var luckybuyActivityBookParticipateRecord = (page,limit,id) => fetch('GET', '/api/luckybuy/getActivityBookParticipateRecord', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :200),
	id:id
});

/*获取图书详情页面-晒单*/
var luckybuyActivityBookBaskSharing = (page,limit,id) => fetch('GET', '/api/luckybuy/getActivityBookBaskSharing', {
	page:(page!=null ? page :1),
	limit:(limit!=null ? limit :200),
	id:id
});
/*晒单详情页面数据*/
var luckybuyActivityBaskSharingDetail= (id) => fetch('GET', '/api/luckybuy/getActivityBaskSharingDetail', {
	offset:0,
	limit:1,
	id:id
});
/*晒单详情页面其他获奖者*/
var luckybuyActivityBaskSharingOther= (user_id) => fetch('GET', '/api/luckybuy/getActivityBaskSharingOther', {
	offset:0,
	limit:20,
	id:user_id
})
	

/*最新晒单*/
var luckybuyNewBaskSharing= (id) => fetch('GET', '/api/luckybuy/getNewBaskSharing', {
	offset:0,
	limit:6,
	id:id
})
/*用户其他晒单*/
var luckybuyUserBaskSharing= (user_id) => fetch('GET', '/api/luckybuy/getUserBaskSharing', {
	offset:0,
	limit:10,
	id:user_id
})
export {
	luckybuyMenu,luckybuyAd,readyLotteryAdver,luckybuyMessages,luckybuyPrizeAffiche,luckybuyNewestAnnounce
	,luckybuyNewestAnnounceMore,luckybuyNewestAnnounceFastest,luckybuyHotRecommendation,luckybuyHotRecommendationMore,luckybuyNewArrivals,luckybuyNewArrivalsMore,luckybuyBaskSharing,luckybuyBaskSharingMore,luckybuyShoppingMsg,luckybuyBookCover
	,userInfo,checkExsis,vCode,luckybuyActivityBookDetail,luckybuyActivityBookParticipateRecord,luckybuyActivityBookBaskSharing,luckybuyActivityBaskSharingDetail,luckybuyActivityBaskSharingOther,luckybuyNewBaskSharing,luckybuyUserBaskSharing
	,accountLogin,regUser,getMobileCode,getCaptchas,checkCaptchas
}
