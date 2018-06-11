<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu v-for="(item,index) in menu" :index="index+'1'" :key="index">
                        <template slot="title"><span>{{item.name}}</span></template>
                        <el-menu-item v-for="(i,idx) in item.submenus" :index="index+1+'-'+idx+1" :key="idx">
                            <router-link :to="{name:i.type}">{{i.name}}</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapState,mapActions} from 'vuex'
//import axios from 'axios';
export default {
    data(){
        return {
            
        }
    },
    computed:{
        ...mapState(['menu'])
    },
    methods:{
            handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        ...mapActions(['fetchMenu'])
    },
    mounted(){
        console.log(this)
        // axios.get('/api').then(res=>{
        //     console.log(res.data.data);
        //     this.menu = res.data.data;
        // })
        // this.$http.get('/static/server/menu.json').then(res=>{
        //     //console.log(res.data.data);
        //     this.menu = res.data.data;
        // })
        //dispatch流程
        //this.$store.dispatch('fetchMenu')
        this.fetchMenu();
    }
}
</script>
<style>

</style>


