import originJsonp from "jsonp";

/**
 * 处理请求函数
 * @param {请求地址} url 
 * @param {返回数据} data 
 * @param {option} option 
 */
let jsonp = (url, data, option) => {

    return new Promise((resolve, reject) => {
        originJsonp(buildUrl(url, data), option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    });
};

/**
 * 该函数 是把 json对象的参数拼接到URL后最后变成XXX?参数名1&参数名2&参数名3 这种形式!
 * @param {URL} url 
 * @param {请求数据} data 
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

export default jsonp;