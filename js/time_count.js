var second = 0;
window.setTimeout("interval();", 1000);
function interval() {
	second++;
	window.setTimeout("interval();", 1000);
}
window.onload = function check_usr_ip() {
	console.log("Client IP Address ：" + VIH_HostIP);
	console.log(returnCitySN["cip"] + ',' + returnCitySN["cname"]);
}

var last_obj_click = null;
function send_message(e) {//click into a category page
	var obj_ID = e.innerHTML;
	last_obj_click = localStorage.last_onclick;
	console.log("user IP Address ：" + VIH_HostIP);
	console.log("user last onclick:" + last_obj_click);
	console.log("user onclick : " + obj_ID);
	localStorage.last_onclick = obj_ID;
}

window.addEventListener('click', (event) => {//click event listener
	console.log("user click :" + `${event.pageX},${event.pageY}`);
})


function log_out() {
	localStorage.removeItem("last_onclick");
	localStorage.removeItem("password");
	localStorage.removeItem("obj_list");
	localStorage.removeItem("user");
	localStorage.removeItem("user click");
}

var page_name = document.getElementById("title").innerHTML;
window.onbeforeunload = function () {//send how many seconds you stay in this page
	var page_split = page_name.split('-');
	var page_name_length = page_name.length;
	if (page_name_length == 2) {
		var big_category = page_split[0];
		var sub_category = page_split[1];
		$.ajax({
			url: 'http://my-database-267023.appspot.com/buy_record',
			type: "POST",
			dataType: 'json',
			data: JSON.stringify({
				"userid": user,
				"category": big_category,
				"sub_category": sub_category,
				"item_name": null,
				"duration": second
			}),

			success: function (result) {
				console.log(page_name + "停留時間" + second + "秒");
			},
			error: function () {
				console.log(second + "send was fail");
			}
		});
	} else if (page_name_length == 3) {
		var big_category = page_split[0];
		var sub_category = page_split[1];
		var product_name = page_split[2];
		$.ajax({
			url: 'http://my-database-267023.appspot.com/buy_record',
			type: "POST",
			dataType: 'json',
			data: JSON.stringify({
				"userid": user,
				"category": big_category,
				"sub_category": sub_category,
				"item_name": product_name,
				"duration": second
			}),

			success: function (result) {
				console.log(page_name + "停留時間" + second + "秒");
			},
			error: function () {
				console.log(second + "send was fail");
			}
		});
	}
}



var item = document.getElementById("title").innerHTML;
function purchase() {
	var page_split = item.split('-');
	var item_id = page_split[2];
	console.log("userid: " + user);
	console.log("userid: " + item_id);
	/*
	$.ajax({
		url: 'http://my-database-267023.appspot.com/buy_record',
		type: "POST",
		dataType: 'json',
		data: JSON.stringify({
			"order_number":order_number,
			"uesr_id": user,
			"item_id": item_id
		}),

		success: function (result) {
			console.log(user + " buy " + item_id);
		},
		error: function () {
			console.log(item + "buy was fail");
		}
	});*/
}

var user = localStorage.user;
function shoppingcar() {
	var msg = "您真的確定加入購物車嗎？";
	var item = document.getElementById("title").innerHTML;
	if (confirm(msg) == true) {
		var obj = localStorage.obj_list;
		obj += ',' + item;
		var tmp = obj.split(',');
		var tmp_length = tmp.length;
		if (tmp[0] == "undefined") {
			tmp.shift(tmp[0]);
		}
		localStorage.obj_list = tmp;
		console.log("local = " + localStorage.obj_list);
	}
}