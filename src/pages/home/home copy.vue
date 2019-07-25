<template>
  <div>
    <header class="header">
      异常信息填报
    </header>
    <section id="container">
      <el-form :model="form" label-width="auto" ref="abnormalRules" :rules="rules" class="abnormalForm" label-position="left">
        <el-form-item label="区域选择" prop="region">
          <el-select v-model="form.region" placeholder="请选择区域" style="width:90%">
            <el-option :label="item.regionName" :value="item.regionName" v-for="(item,index) in reRionList" :key="'region'+index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="填报信息" prop="abnormalInfo">
          <el-input type="textarea" :rows="4" v-model="form.abnormalInfo"></el-input>
        </el-form-item>
      </el-form>
       <el-button type="primary" @click="onSubmit('abnormalRules')" class="submit">提交</el-button>
    </section>
    <section class="box-wrapper" v-if="toggle">
      <header class='box-head'>提示</header>
      <section class='box-content'>{{this.message}}</section>
      <footer class="box-footer">
        <el-button type="primary" size="mini" @click="toggle = false" >确定</el-button>
      </footer>
    </section>
    <section class="cover" v-if="toggle"></section>
  </div>
</template>

<script>
import { saveForm, getRegion } from '../../api/data'
export default {
  data(){
    return{
      form:{
        region: '',
        abnormalInfo:''
      },
      rules:{
        region: [
           { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        abnormalInfo: [
          { required: true, message: '请填写填报信息', trigger: 'blur' }
        ]
      },
      reRionList: [],
      message:'',
      toggle: false
    }
  },
  mounted(){
    getRegion().then(res => {
      if(res.status == 200){
        this.reRionList =  res.data;
      }
    })
  },
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate( vaild => {
        if(vaild){
          let params = {
            exceptionInfo:{
              region : this.form.region,
              info : this.form.abnormalInfo
            }
          }
          saveForm(params).then(res => {
            if(res.status == 200){
              this.toggle = true;
              this.message = '填报成功'
            }
          })

        }else{
          this.message = '填报失败，请重试'
          return false;
        }
      })
    },
  }
}
</script>

<style lang='scss' scoped>
  @import '../../style/mixin';
  .header{
    @include wh(100%, 1.95rem);
    line-height: 1.95rem;
    @include sc(0.9rem, #fff);
    background: $blue;
    position: fixed;
    top: 0;
    text-align: center;
    z-index: 100;
  }
  #container{
    padding: 1.95rem 0.75rem;
    .abnormalForm{
      margin-top: 1rem; 
    }
  }
  .submit{
    width:100%;
  }
  .box-wrapper{
    z-index: 2001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 12rem;
    height: 150px;
    border-radius: 0.3rem;
    background: #fff;
    .box-head{
      font-size:0.8rem;
      padding: 0.35rem;
      font-weight: 500;
    }
    .box-content{
      height: 60px;
      line-height: 60px;
      font-size: 0.7rem;
      text-align: center;
    }
    .box-footer{
      font-size:0.7rem;
      padding: 0.35rem 1rem;
      font-weight: 500;
      position: relative;
      button{
        float: right;
      }
    }
  }
  .cover{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
    z-index: 2000;
  }
</style>
