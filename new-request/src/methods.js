import {$http} from './base.js'

const urlReplace = function (url, PathParam) {
    let newUrl = url;
    let urls = newUrl.match(/\{[^\}]+\}/g)
    if (PathParam) {
        for (var i in PathParam) {
            for (var j = 0; j < urls.length; j++) {
                if ((urls[j].slice(1, -1)) === i) {
                    newUrl = newUrl.split(urls[j])[0] + PathParam[i] + newUrl.split(urls[j])[1]
                }
            }
        }
    }
    return newUrl;
}


function fetch({
                   method,
                   url,
                   PathParam,
                   UrlParam,
                   bodyParam,
                   config = null
               }) {
    let fullUrl = urlReplace(url, PathParam);

    let p = new Promise((resolve, reject) => {
        $http({
            method: method,
            url: fullUrl,
            params: UrlParam,
            data: bodyParam,
            ...config
        }).then(result => {
            resolve(result);
        }).catch(error => {
            reject(error)
        })
    });
    return p;
}

function Get({
                 url,
                 PathParam = null,
                 UrlParam = null,
                 config = null
             }) {
    return fetch({
        method: 'get',
        url: url,
        PathParam: PathParam,
        UrlParam: UrlParam,
        config: config
    })
}

function Post({
                  url,
                  PathParam = null,
                  UrlParam = null,
                  bodyParam = null,
                  config = null
              }) {
    return fetch({
        method: 'post',
        url: url,
        PathParam: PathParam,
        UrlParam: UrlParam,
        bodyParam: bodyParam,
        config: config
    })
}

function Patch({
                   url,
                   PathParam = null,
                   UrlParam = null,
                   bodyParam = null,
                   config = null
               }) {
    return fetch({
        method: 'patch',
        url: url,
        PathParam: PathParam,
        UrlParam: UrlParam,
        bodyParam: bodyParam,
        config: config
    })
}

function Put({
                 url,
                 PathParam = null,
                 UrlParam = null,
                 bodyParam = null,
                 config = null
             }) {
    return fetch({
        method: 'put',
        url: url,
        PathParam: PathParam,
        UrlParam: UrlParam,
        bodyParam: bodyParam,
        config: config
    })
}

function Delete({
                    url,
                    PathParam = null,
                    UrlParam = null,
                    config = null
                }) {
    return fetch({
        method: 'delete',
        url: url,
        PathParam: PathParam,
        UrlParam: UrlParam,
        config: config
    })
}

export {
    Post,
    Delete,
    Put,
    Patch,
    Get
}
