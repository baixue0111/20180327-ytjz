
myRecord();
// 我的战绩
function myRecord() {
	let phone = localStorage.getItem('phone');
	let url = '/weixin/oldIron/winning';
	let param = {};
	param['phone'] = phone;

	$.ajax({
		url: url,
		type: 'post',
		data: JSON.stringify(param),
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		success: function (data) {
			let flow = data.flows;
			let friends = data.friends;
			$('.friend').html(friends);
			$('.flow').html(flow);
			if (data.winning) {
				$.each(data.winning, function (i, item) {
					let itemDate = item.CREATE_DATE;
					let itemPhone = item.RECOMMEND_PHONE;
					let itemReward = item.REWARD;

					$(".date-ul").append('<li>'+itemDate.substring(0, 10)+'</li>');
					$(".phone-ul").append('<li>'+itemPhone+'</li>');
					$(".flow-ul").append('<li>'+itemReward+'元</li>');
				})
			} else {
				$(".con-list").hide();
				$(".error").show();
			}
		}
	})
}