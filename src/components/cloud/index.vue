<template>
  <div class="xy-cloud-wraper">
    <ul class="left-cates">
      <li
        v-for="(v,i) in cates"
        :key="i"
        :class="[active === i ? 'active' : '']"
        @click="onCatesChange(i)">
        <a-icon v-if="v.icon" :type="v.icon" />
        {{v.name}}
      </li>
    </ul>
    <div class="right-content">
      <div class="tools-bar">
        <a-upload
          class="cloud-upload-btn"
          name="file"
          :accept="acceptFileTypes"
          :showUploadList="false"
          :beforeUpload="onBeforeUpload"
          :customRequest="onUpload"
        >
          <a-button> <a-icon type="upload" /> 上传文件 </a-button>
          <div v-if="currentUploadFile" class="cloud-upload-progress">
            <p class="tips">
              <span class="name">{{currentUploadFile.name}}</span>
              <span>{{currentUploadFile.status}} {{currentUploadFile.percent}}%</span>
            </p>
            <div class="progress-bar">
              <span :style="{width: currentUploadFile.percent + '%'}"></span>
            </div>
          </div>
        </a-upload>
        <div class="right-wraper">
          <a-icon type="delete" title="删除" />
          <a-icon type="reload" title="刷新" />
        </div>
      </div>
      <div class="files-wraper">
        <div v-if="isLoading" class="loading-wraper">
          <loading></loading>
        </div>
        <template v-else>
          <data-none v-if="cloudFiles.length === 0"><p>暂无数据</p></data-none>
          <div v-else class="files-content">
            <div
              v-for="file in cloudFiles"
              :key="file._id"
              :class="['item', selected.indexOf(file._id) > -1?'selected':'']"
              :title="file.name"
              @click="onSelectChange(file._id)">
              <img :src="$ci + file.cosName + '?imageMogr2/thumbnail/129x'" :alt="file.name" />
              <div class="checkbox"></div>
              <a-icon type="check" v-if="selected.indexOf(file._id) > -1" :style="{color: '#fff'}" />
            </div>
          </div>
        </template>
        <div class="pagination-wraper">
          <span>容量:<b>0M</b>/5G</span>
          <a-pagination
            v-show="cloudFiles.length > 0"
            simple :defaultCurrent="2"
            :total="50" @change="onPaginationChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataNone from '@/components/feedback/none'
import loading from '@/components/feedback/loading'
export default {
  components: {dataNone, loading},
  props: {
    multiSeleted: Boolean
  },
  data(){
    return{
      isLoading: false,
      active: 0,
      cates: [
        {name: '全部文件', icon: ''},
        {name: '图片', icon: 'picture'},
        {name: '视频', icon: 'play-circle'},
        {name: '垃圾桶', icon: 'delete'}
      ],
      selected: [],
      cloudFiles: [],
      acceptFileTypes: 'image/gif,image/jpeg,image/jpg,image/png,video/mp4',
      currentUploadFile: null
    }
  },
  methods: {
    onCatesChange(i){
      if(i !== this.active){
        this.isLoading = true;
        this.active = i;
        setTimeout(()=>{
          this.isLoading = false;
        }, 500);
      }
    },
    onSelectChange(_id){
      if(this.multiSeleted){
        const index = this.selected.indexOf(_id);
        if(index > -1){
          this.selected.splice(index, 1);
        }else{
          this.selected.push(_id);
        }
      }else{
        this.selected = [_id];
      }
    },
    onPaginationChange(){
      this.isLoading = true;
      setTimeout(()=>{
        this.isLoading = false;
      }, 500);
    },
    onBeforeUpload(file){
      if(this.acceptFileTypes.indexOf(file.type) === -1){
        this.$message.error('不支持的文件格式');
        return false;
      }else if(file.size > 1024*1024*2){
        this.$message.error('上传尺寸不能大于2M')
        return false;
      }
    },
    onUpload(e){
      // 用于文件上传请求的表单数据
      let formData = new FormData();
      // 读取文件的实例
      const reader = new FileReader();
      // 上传提示
      this.currentUploadFile = {
        name: e.file.name,
        status: '上传中...',
        percent: 0
      };
      setTimeout(()=>{
        this.currentUploadFile.percent = 40;
      }, 300);
      // 文件加载完成
      reader.onload = readData =>{
        // 文件数据
        const data = readData.target.result;
        // 图片实例
        const img = new Image();
        // 图片加载完成
        img.onload = () => {
          // 绑定文件数据和图片宽高
          formData.append('file', e.file);
          formData.append('width', img.width);
          formData.append('height', img.height);
          formData.append('size', e.file.size);
          // 开始上传到服务器
          this.$axios.post('/api/upload', formData, {
            headers: { "Content-Type": "multipart/form-data" }
          }).then(res=>{
            this.cloudFiles.unshift(res.data);
            // 上传完成提示
            res.data = Object.assign(res.data, {
              status: '上传完成',
              percent: 100
            });
            this.currentUploadFile = res.data;
            setTimeout(()=>{
              this.currentUploadFile = null;
            }, 2000)
          }).catch(err=>console.log(err));
        }
        img.src = data;
      }
      reader.readAsDataURL(e.file);
    }
  }
}
</script>

<style lang="scss">
.xy-cloud-wraper{
  display: flex;
  .left-cates{
    flex: 0 0 200px;
    border-right: solid 1px #eee;
    padding: 20px;
    margin: 0;
    list-style: none;
    li{
      padding: 10px;
      border-bottom: solid 1px #f5f5f5;
      cursor: pointer;
      margin-bottom: 1px;
      i{
        color: #b3bbbd;
        font-size: 16px;
        margin-right:5px;
      }
      &.active,&:hover{
        background: #eff6fb;
      }
    }
  }
  .right-content{
    flex: 1 1 auto;
  }
  .tools-bar{
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: solid 1px #eee;
    .right-wraper i{
      font-size: 18px;
      margin: 0 10px;
      cursor: pointer;
      &:hover{
        opacity: 0.6;
      }
    }
  }
  .files-wraper{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    min-height: 510px;
    flex-direction: column;
    .item{
      width: 129px;
      height: 129px;
      background: #f2f2f2;
      border: solid 1px #eee;
      margin: 5px;
      box-sizing: border-box;
      position: relative;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img{
        width: 100%;
      }
      .checkbox{
        visibility: hidden;
      }
      &:hover, &.selected{
        cursor: pointer;
        border: solid 2px $primary-color;
        .checkbox{
          visibility: visible;
          position: absolute;
          border: solid 2px $primary-color;
          display: block;
          left: -2px;
          top: -2px;
          width: 20px;
          height: 20px;
          z-index: 1;
          border-radius: 0 0 2px 0;
        }
      }
      &.selected{
        .checkbox{
          background:$primary-color;
        }
        i{
          position: absolute;
          left: 2px;
          top: 2px;
          z-index: 2;
          pointer-events: none;
          font-size: 12px;
        }
      }
    }
  }
  .files-content{
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    align-content: flex-start;
  }
  .loading-wraper{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 120px 0;
    flex: 1 1 auto;
  }
  .pagination-wraper{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    flex: 0 0 auto;
  }
  .cloud-upload-btn{
    position: relative;
  }
  .cloud-upload-progress{
    position: absolute;
    top: 100%;
    width: 360px;
    background:rgba(255,255,255,0.9);
    padding: 15px 20px;
    box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
    z-index: 9;
    .tips{
      display: flex;
      justify-content: space-between;
    }
    .progress-bar{
      height: 2px;
      background: #ddd;
      border-radius: 1px;
      margin-top: 10px;
      position: relative;
      span{
        display: block;
        position: absolute;
        height: 1px;
        border-radius: 2px;
        background: $primary-color;
        top: 0;
        left: 0;
        transition: all .2s;
      }
    }
    .name{
      @include lineover;
    }
  }
}
</style>