import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login';
import Select from '@/views/Select/Select'
import EmployeeAdmin from '@/views/EmployeeAdmin/EmployeeAdmin'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter(to,form,next){
        next();
      }
    },
    {
      path: '/Select',
      name: 'Select',
      component: Select,
      children:[
        {
          path:'employee_admin',
          name:'employee_admin',
          component:EmployeeAdmin
        }
      ]
    }
  ]
})
//导航守卫
router.beforeEach((to,form,next)=>{
  //console.log(to);
  //console.log(from);
  if(to.name==='Login'){
    next()
  }else{
    let islogin = sessionStorage.getItem('islogin')
    if(islogin){
      next()
    }else{
      next('/Login')
    }
  }
})
export default router;
