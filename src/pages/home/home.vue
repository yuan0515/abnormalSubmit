<template>
  <div>
    <header class="header">
      异常信息填报
    </header>
    <section id="container">
      <form action="#">
        <section>
          <van-field
            readonly
            clickable
            label="地区"
            :value="form.region"
            placeholder="选择地区"
            @click="showPicker = true"
          />
        </section>
        <section>
          <van-cell-group>
            <van-field
              v-model="form.abnormalInfo"
              label="信息"
              type="textarea"
              placeholder="请输入异常信息"
              rows="4"
              autosize
            />
          </van-cell-group>
        </section>
        <section class="fileGroup">
          <section class="title">图片上传</section>
          <van-uploader v-model="fileList" multiple :after-read="afterRead" @delete="deleteImg" />
        </section>
      </form>
      <van-button type="info" @click="onSubmit()" class="submit">提交</van-button>
    </section>
    <section class="box-wrapper" v-if="toggle">
      <header class='box-head'>提示</header>
      <section class='box-content'>{{this.message}}</section>
      <footer class="box-footer">
        <el-button type="primary" size="mini" @click="toggle = false" >确定</el-button>
      </footer>
    </section>
    <section class="cover" v-if="toggle"></section>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="reRionList"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { saveForm, getRegion } from '../../api/data'
import { Dialog } from 'vant';
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
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }
      ],
      reRionList: [],
      message:'',
      toggle: false,
      showPicker: false
    }
  },
  mounted(){
    getRegion().then(res => {
      if(res.status == 200){
        let newArr = [];
        res.data.forEach( item =>{
          newArr.push(item.regionName);
        })
        this.reRionList = newArr;
      }
    })
  },
  methods:{
    onSubmit(){
      let num = 0;
      let err = {}
      Object.keys(this.form).forEach( key => {
        if(!this.form[key]){
          num++;
          err[key] = key == 'region' ? '请选择区域' : '请填写异常信息'
        }
      })
      if(num){
        Dialog.alert({
          message: '弹窗内容'
        }).then(() => {
          // on close
        });
        return;
      }
      let params = {
        exceptionInfo:{
          region : this.form.region,
          info : this.form.abnormalInfo
        }
      }
      return;
      saveForm(params).then(res => {
        if(res.status == 200){
          Dialog.alert({
            message: '填报成功'
          })
        }
      })
    },
    onConfirm(value) {
      this.form.region = value;
      this.showPicker = false;
    },
    //上传图片到服务器
    afterRead(file){
      console.log(file,this.fileList)
    },
    //删除图片回调
    deleteImg(file){
      console.log(file,this.fileList);
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
    background: #1989fa;
    position: fixed;
    top: 0;
    text-align: center;
    z-index: 100;
  }
  #container{
    padding-top: 1.95rem;
    background: #fff;
    .abnormalForm{
      margin-top: 1rem; 
    }
    form .fileGroup{
      padding: 0.7rem 0.6rem;
      .title{
        color: #323233;
        font-size: 0.6rem;
        height: 2rem;
        line-height: 2rem;
      }
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
