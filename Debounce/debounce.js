
/*
* 防抖：触发事件后隔一段时间才会执行，期间如果又触发则时间重新开始计。
* @params func: 防抖执行的函数
* @params wait: 等待时间
* @params immediate: 是否立即执行
*/
function debounce (func, wait, immediate) {
	let timeout, result;
	let _debounce = function () {
		let context = this;
		let args = arguments;
		if(timeout) clearTimeout(timeout);
		if(immediate) {
			let callNow = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			}, wait);
			if (callNow) result = func.apply(context, args);
		} else {
			timeout = setTimeout(function () {
				result = func.apply(context, args);
			}, wait);
		}
		return result;
	}
	_debounce.cancel = function() {
		clearTimeout(timeout);
		timeout = null;
	}
	return _debounce;
}

window.onload = function () {
	let count = 1;
	let content = document.getElementById('content');
	
	function getUserAction() {
		console.log(this);
		content.innerHTML = count++;
	};
	
	content.onmousemove = debounce(getUserAction, 1000, true);
}

