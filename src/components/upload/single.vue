<template>
  <div class="cloud-page">
    <div class="poster-upload-item" @click="() => visible = true">
      <template v-if="img">
        <img :src="$ci + img + '?imageMogr2/thumbnail/129x'" />
        <span class="clear" @click.stop="()=>img=null">×</span>
      </template>
      <template v-else>
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </template>
    </div>
    <a-tooltip v-if="tips" placement="right">
      <a-icon type="question-circle" :style="{color: '#ccc', fontSize: '16px', marginLeft: '10px'}" />
      <template slot="title">{{tips}}</template>
    </a-tooltip>
    <a-modal
      title="云盘"
      :visible="visible"
      @cancel="()=>visible=false"
      @ok="onOk"
      cancelText="取消"
      okText="确认"
      width="80%"
    >
      <div class="cloud-wraper">
        <cloud @onSelect="files => selectedFiles = files"></cloud>
      </div>
    </a-modal>
  </div>
</template>

<script>
import cloud from '../cloud/index'
export default {
  props: {
    imgUrl: String,
    tips: String
  },
  components: {cloud},
  data(){
    return{
      visible: false,
      selectedFiles: [],
      img: this.imgUrl
    }
  },
  methods: {
    onOk(){
      this.img = this.selectedFiles[0].cosName;
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
.poster-upload-item {
  width: 100px;
  height: 100px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  .clear{
    position: absolute;
    display: flex;
    width: 20px;
    height: 20px;
    right: 0;
    top: 0;
    background: orangered;
    color: #fff;
    align-content: center;
    justify-content: center;
    line-height: 20px;
    font-size: 16px;
    visibility: hidden;
  }
  &:hover{
    .clear{
      visibility: visible;
    }
  }
  .anticon-plus {
    color: rgba(0, 0, 0, 0.25);
    font-size: 30px;
  }
  img{
    max-width: 100%;
  }
  .ant-upload-text{
    text-align: center;
    width: 100%;
  }
}
.cloud-wraper{
  margin: -24px;
}
.cloud-page{
  display: flex;
  align-items: center;
}
</style>