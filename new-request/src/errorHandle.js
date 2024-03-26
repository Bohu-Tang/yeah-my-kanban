let create = (errorHandler) => {
    // 错误消息映射表，提高可维护性和可读性
    const errorMessageMap = {
        400: '错误请求',
        453: '业务错误',
        401: '对不起，您的登录已失效...请重新登录!',
        403: '无权限',
        408: '请求超时',
        500: '服务器错误',
        501: '功能未实现',
        503: '服务不可用',
        504: '网关错误',
    };

    // 安全地获取错误消息，避免undefined
    const safeGetErrorMessage = (status) => {
        const defaultMsg = '未知错误';
        return errorMessageMap[status] || defaultMsg;
    };

    return function (error) {
        let _message = null;

        // 更加健壮的错误检查
        if (error && error.response && error.response.status) {
            const status = error.response.status;
            let errorMsg = safeGetErrorMessage(status);

            // 对于453状态码的额外逻辑处理
            if (status === 453 && error.response.data && error.response.data.errorMessage) {
                errorMsg = error.response.data.errorMessage;
            }

            errorHandler && errorHandler(status, errorMsg);

        } else {
            _message = '连接到服务器失败';
            errorHandler && errorHandler(500, _message);
        }

        // 返回一个拒绝的Promise，可以考虑对错误对象进行封装
        return Promise.reject(error);
    }
}


let responseIntercept = function (response) {
    return response
}

let createResponseInterceptError = create

export {
    responseIntercept,
    createResponseInterceptError
}
