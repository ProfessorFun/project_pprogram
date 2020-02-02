var second=0;
var minute=0;
var hour=0;
window.setTimeout("interval();",1000);
function interval()
{
	second++;
	if(second==60)
	{
	second=0;minute+=1;
	}
	if(minute==60)
	{
	minute=0;hour+=1;
    }
    console.log(hour+"時"+minute+"分"+second+"秒");
	window.setTimeout("interval();",1000);
}


	window.onload = function check_usr_ip() {
		console.log("Client IP Address ：" + VIH_HostIP);
		console.log(returnCitySN["cip"] + ',' + returnCitySN["cname"]);
	}

	var last_obj_click=null;
	function send_message(e) {
		var obj_ID = e.innerHTML;
		last_obj_click = localStorage.last_onclick;
		console.log("user IP Address ：" + VIH_HostIP);
		console.log("user last onclick:"+last_obj_click);
		console.log("user onclick : "+obj_ID);
		localStorage.last_onclick=obj_ID;
	}

	/*window.addEventListener('mousemove', (event) => {
		
		console.log(`${event.pageX},${event.pageY}`);
	})*/

	window.addEventListener('click', (event) => {
		console.log("user click :"+`${event.pageX},${event.pageY}`);
	})


	function event_click(e) {
		var obj_id = document.getElementsByName("item1").nextSibling;;
		console.log(obj_id);
	}
	function log_out() {
        /*var expire_days = 1; // 過期日期(天)
        var d = new Date();
        d.setTime(d.getTime() - (expire_days * 10 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "expire_days=ten_minute" + "; " + expires + ";";*/
		localStorage.clear();
	}