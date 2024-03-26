import axios from "axios";

let $http = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 10000
})

/**
 * 注册一个请求拦截器。
 * @param {Function} request - 成功拦截请求的回调函数。
 * @param {Function} requestError - 处理请求错误的回调函数。
 */
function requestUse(request, requestError) {
    // 使用$http.interceptors.request.use注册请求拦截器
    $http.interceptors.request.use(request, requestError);
}


/**
 * 注册一个响应拦截器到$http服务。
 * @param {Function} response - 成功响应的处理函数。该函数接收一个响应对象作为参数，并应返回该响应对象或对其进行修改后的对象。
 * @param {Function} responseError - 错误响应的处理函数。该函数接收一个响应对象作为参数
 */
function responseUse(response, responseError) {
    $http.interceptors.response.use(response, responseError);
}


export {
    $http,
    requestUse,
    responseUse
}