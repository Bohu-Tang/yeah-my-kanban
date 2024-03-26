import {$http, requestUse, responseUse} from "./base";
import {responseIntercept, createResponseInterceptError} from "./errorHandle";
import {
    Post,
    Delete,
    Put,
    Patch,
    Get
} from './methods'

let install = (errorHandler) => {
    responseUse(responseIntercept, createResponseInterceptError(errorHandler))
}

export {
    $http,
    requestUse,
    responseUse,
    install,
    Post,
    Delete,
    Put,
    Patch,
    Get

}