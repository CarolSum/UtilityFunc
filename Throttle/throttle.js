// 根据时间戳实现节流
function throttle (func, wait) {
	let previous = 0;
  return function () {
		let context = this;
		let args = arguments;
		let now = new Date();
		if(now - previous > wait) {
			func.apply(context, args);
			previous = now;
		}
	}
}

// 使用timeout实现节流
function timeoutThrottle (func, wait) {
	let timeout;
	return function () {
		let context = this;
		let args = arguments;
		if(!timeout) {
			timeout = setTimeout(function () {
				timeout = null;
				func.apply(context, args);
			}, wait);
		}
	}
}

window.onload = function () {
	let count = 1;
	let content = document.getElementById('content');
	
	function getUserAction() {
		console.log(this);
		content.innerHTML = count++;
	};
	
	content.onmousemove = throttle(getUserAction, 1000, true);
}