<template>
    <div>
      <el-table-column>
        <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="用户姓名">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="归属组织">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
               <el-form-item label="归属组织">
                  <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="归属组织">
                  <el-popover width="400" trigger="focus" @after-enter="toFetchGroup">
                      <el-container direction="vertical" v-loading="flag">
                          <el-form>
                              <el-row>
                                  <el-col :span="18">
                                      <el-input v-model="cont"></el-input>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-button @click="filterItem=cont">查询</el-button>
                                  </el-col>
                              </el-row>
                          </el-form>
                          <el-table :data="filterGroup()(filterItem)" :stripe="true" height="500" @row-click="rowClick">
                              <el-table-column width="60" type="index" label="序号"></el-table-column>
                              <el-table-column width="170" property="ORGNAME" label="组织名称"></el-table-column>
                              <el-table-column width="170" property="FORGNAME" label="上级组织"></el-table-column>
                          </el-table>
                      </el-container>
                  <el-input v-model="newform.org" slot="reference"></el-input>
                      <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
                  </el-popover>
              </el-form-item>
              <el-form-item>
                  <el-button>查询</el-button>
              </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" v-loading="tableLoading">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="id" label="员工ID"  width="150" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="code" label="员工编码" width="120"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
          <el-table-column prop="org" label="归属组织" width="120"></el-table-column>
          <el-table-column prop="auth" label="权限" width="120"></el-table-column>
          <el-table-column prop="forg" label="上级组织" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="120"> </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="change(scope)" type="text" size="small">编辑</el-button>
              <el-button @click="remove(scope)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-table-column>
      <el-pagination @current-change="pageChange" :page-size="pageSize" background layout="prev, pager, next" :total="table.length">
      </el-pagination>
      <el-button style="float:right" @click="addNew">添加</el-button>
      <el-dialog title="新加/编辑" :visible.sync="dialogFormVisible">
        <el-form ref="newf" :inline="true"  :rules="newFormRules" :model="newform" lobel-position="left" label-width="80">
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="newform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="newform.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="newform.code" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="newform.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="人员状态">
            <el-select v-model="newform.auth" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="newform.mobile" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="归属组织">
            <el-input v-model="newform.forg" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters ,mapMutations} from "vuex"; 
export default {
  data() {
    return {
      form: {
        name: "test",
        group: "位置组织"
      },
      newform:{
        name:'',
        email:'',
        code:'',
        id:'',
        auth:'',
        mobile:'',
        group:'',
        org:'',
        forg: ""
      },
      newFormRules: {
                name: [
                    { required: true, message: "请填写姓名", trigger: "blur" },
                    {
                        type: "string",
                        message: "必须填写字符",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请填写正确的邮箱格式",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请填写正确的邮箱，换",
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请填写的证件号",
                        trigger: "blur"
                    }
                ]
            },
      flag: false,
      filterItem: "",
      cont: "",
      tableLoading:false,
      pageSize:5,
      page:1,
      formLabelWidth:90,
      dialogFormVisible:false
    };
  },
  computed:{
      //...mapState(['group'])
      tableData(){
        let tableArr = this.table.slice(this.pageSize*(this.page-1),this.pageSize*this.page)
        console.log(tableArr)
        return tableArr
      },
      ...mapState(['table'])
  },
  // watch:{
  //     group(_old,_new){
  //         this.flag = false;
  //     }
  // },
  methods: {
    toFetchGroup() {
      this.flag = true;
      this.fetchGroup(() => {
        this.flag = false;
      });
    },
    toFetchTable(){
      //this.$store.dispatch('fetchTable')
       this.tableLoading = true;
      this.fetchTable(() => {
        this.tableLoading = false;
      });
      //this.fetchTable()
    },
    rowClick(row, event, column) {
      this.form.group = row.ORGNAME;
    },
    change(scope) {
      console.log(JSON.stringify(scope.row));
      this.dialogFormVisible = true;
      this.newform = scope.row
    },
    remove(scope){
      console.log(scope.row)
      this.$confirm('您确定要删除这个人吗？',"提示",{
        callback:()=>{
          this.deleteItem({
            code:scope.row.code,
            cd:()=>{
              this.$message("删除成功")
            }
          })
        }
      })
    },
    addNew(){
      this.newform = {
        name:'',
        email:'',
        code:'',
        id:'',
        auth:'',
        mobile:'',
        group:'',
        org:'',
        forg: ""
      },
      this.dialogFormVisible = true;
    },
    sure() {
            this.$refs.newf.validate((isValid, tag) => {
                console.log(isValid);
                console.log(tag);
                this.dialogFormVisible = false;
                 //this.$http('/addnew',this.newfrom).then(res=>{ })
            });
        },
    pageChange(page){
      this.page = page
    },
    ...mapMutations(["deleteItem"]),
    ...mapActions(["fetchGroup","fetchTable"]),
    ...mapGetters(["filterGroup"])
  },
  mounted() {
    this.toFetchTable()
  }
};
</script>
<style>
.el-form-item {
  display: inline-block;
}
.el-input,
.el-input__inner {
  width: 300px;
}
.el-button,
.el-button--text,
.el-button--small {
  display: inline-block;
}
.el-pagination{
  display: inline-block;
}
.el-button, .el-button--default{
  display: inline-block;
}
</style>

