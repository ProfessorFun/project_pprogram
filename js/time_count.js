var second = 0;
var minute = 0;
var hour = 0;
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
function send_message(e) {
	var obj_ID = e.innerHTML;
	last_obj_click = localStorage.last_onclick;
	console.log("user IP Address ：" + VIH_HostIP);
	console.log("user last onclick:" + last_obj_click);
	console.log("user onclick : " + obj_ID);
	localStorage.last_onclick = obj_ID;
}

/*window.addEventListener('mousemove', (event) => {
	
	console.log(`${event.pageX},${event.pageY}`);
})*/

window.addEventListener('click', (event) => {
	console.log("user click :" + `${event.pageX},${event.pageY}`);
})

function log_out() {
	localStorage.clear();
}

window.onbeforeunload = function () {
	var page_name = document.getElementById("title").innerHTML;
	console.log(page_name + "停留時間" + second + "秒");
}
function purchase() {
	var item = document.getElementById("title").innerHTML;
	console.log(user_name + " buy " + item);
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
		for (i = 0; i < tmp_length; i++) {
			if (tmp[i] == item) {

			} else {
				//localStorage.obj_list = tmp;
			}
		}
		console.log("local = " + localStorage.obj_list);
	}
}