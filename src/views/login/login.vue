<template>
    <div class="login-wrap">
        <header>电信通</header>
        <div class="content">
            <img src="../../../static/images/loginbg.jpg" alt="">
            <div class="cont">
                <p>
                    <span v-on:click="tabChange('qrcode')" :class="activeChange('qrcode')">二维码登录</span>
                    <span v-on:click="tabChange('account')" :class="activeChange('account')">账号登录</span>
                </p>
                <div>
                    <Component :is="loginWay"></Component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qrcode from './qrcode'
import account from './account.vue'
export default {
    data(){
        return {
            loginWay:'qrcode',
            activeClass:''
        }
    },
    beforeRouteEnter(to,form,next){
        next();
    },
    components:{
        qrcode,
        account
    },
    methods:{
        tabChange(str){
            this.loginWay=str;
        },
        activeChange(str){
            return this.loginWay===str?'active':''
        }
    }
}
</script>
<style scoped src="./login.css"></style>