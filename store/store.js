import Vue from 'vue'
import Vuex from 'vuex'
import {instance as http} from '../utils/http'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        menu:[],
        group:[],
        table:[]
    },
    mutations:{//通过commit来触发一个mutation
        updateMenu(state,data){
            state.menu = data.data.data
        },
        updateGroup(state,payload){
            state.group = payload.data.orgs
        },
        updateTable(state,payload){
            state.table = payload
        }
    },
    actions:{//通过dispatch来触发一个action
        fetchMenu({commit}){
            http.get('/static/server/menu.json').then(res=>{
                //console.log(res.data.data);
                //this.menu = res.data.data;
                setTimeout(()=>{
                    commit('updateMenu',res)
                },1000)
            })
        },
        fetchGroup({commit,state},cb){
            if(state.group.length>0){
                cb();
            }
            http.get('/static/server/group.json').then(res=>{
                setTimeout(()=>{
                    store.commit('updateGroup',res)
                    cb();
                },1000)
            })
        },
        fetchTable({commit,state},payload){
            http.get('/static/server/user.json').then(res=>{
                    setTimeout(()=>{
                        commit('updateTable',res.data.userList)
                        payload()
                    },1000)
            })
        }
    },
    getters:{
        filterGroup(state){
            return (filter)=>{
                if(filter){
                    let res = state.group.filter((item)=>{
                        return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                    })
                    return res
                }else{
                    return state.group
                }
            }        
        }
    },
    modules:{}
})
export default store