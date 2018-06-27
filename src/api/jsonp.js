import originJsonp from "jsonp"

/**
 * 使用 jsonp 封装请求方法
 * @param url
 * @param data
 * @param option
 * @returns {Promise<any>}
 */
let jsonp = (url, data, option) => {
	return new Promise((resolve, reject) => {
		originJsonp(buildUrl(url, data), option, (err, data) => {
			if (!err) {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
};

/*
 * url路径格式化
 * @param url
 * @param data
 * @returns {*}
 */
function buildUrl(url, data) {
	let params = [];
	for (var k in data) {
		params.push(`${k}=${data[k]}`);
	}
	let param = params.join("&");
	if (url.indexOf("?") === -1) {
		url += "?" + param;
	} else {
		url += "&" + param;
	}
	return url;
}

export default jsonp