import axios from 'axios';

let instance = axios.create({
    timeout:3000
})
//请求拦截
instance.interceptors.request.use((config)=>{
    return config;
},(error)=>{
    return Promise.reject(error);
    //console.log(error);
})
//响应拦截
instance.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    return Promise.reject(error);
    console.log(error);
})
//vue插件
let httpPlugin = {
    install(Vue){
        //防止$http在将来被覆盖
        Object.defineProperty(Vue.prototype,'$http',{
            value:instance
        })
    }
}
export { instance }
export default httpPlugin;
