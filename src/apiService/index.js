import { Post } from 'new-request-xlx';
import { api } from '../api/index'

function testPost(param) {
    return Post({
        url: api.testApi,
        bodyParam: param,
        config:{
            headers: {
                'Authorization': 'Bearer a48a71b55c434553b849728c03ed8333'
            }
        }
        
    })
}

export {
    testPost
}