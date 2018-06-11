<template>
    <div class="denglu">
        <el-form :model="loginModel" ref="form">
            <el-form-item prop="account" :rules="rules" label="账号登录">
                <el-input v-model="loginModel.account" placeholder="请输入手机号" class="ipt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="isPhoneDisabled" v-on:click="checkValidate('phone')">{{phoneMsg}}</el-button>
                <el-button :disabled="isEmailDisabled" v-on:click="checkValidate('email')">{{emailMsg}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码">
                <el-input placeholder="请输入动态密码" class="ipt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="butt" @click="goLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loginModel:{
               account:''
            },
            rules:[
                {required:true,message:'请输入手机号'}
            ],
            phoneMsg:'重新发送',
            emailMsg:'邮箱获取动态密码',
            timer:null,
            isPhoneDisabled:false,
            isEmailDisabled:false
        }
    },
    methods:{
        countDown(type){
            let start = 5;
            this.timer = setInterval(()=>{
                start--;
                type==='phone'?this.isPhoneDisabled = true:this.isEmailDisabled=true;
                type==='phone'?this.phoneMsg="倒计时"+start+"s":this.emailMsg="倒计时"+start+"s";
                if(start<0){
                    type==='phone'?this.phoneMsg = "重新发送":this.emailMsg="邮箱获取动态密码";
                    //this.phoneMsg="重新发送";
                    //this.emailMsg="邮箱获取动态密码";
                    clearInterval(this.timer);
                    type==='phone'?this.isPhoneDisabled = false:this.isEmailDisabled=false;
                }
            },1000)
        },
        goLogin(){
            sessionStorage.setItem('islogin',1)
            this.$router.push('/select')
        },
        checkValidate(type){
            if(this.rules.length>1){
                this.rules.pop()
            }
            if(type=="phone"){
                this.rules.push({validator:(rule,value,callback)=>{
                    // console.log(rule)
                    // console.log(value);
                    // callback()
                    if(/^1[3578]\d{9}$/.test(value)){
                        callback()
                    }else{
                        callback(new Error('请输入正确手机号'))
                    }
                },message:'请输入正确的手机号'},);
            }else if(type==="email"){
                this.rules.push({type,message:'请输入正确的邮箱'},)
            }
            this.$refs.form.validate((isValid,rules)=>{
                //console.log(isValid);
                //console.log(rules)
                if(isValid){
                    this.countDown(type);
                }
            })
        }
    }
}
</script>
<style scoped src="./login.css">

</style>