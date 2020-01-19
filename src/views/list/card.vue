<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="list-card-container">
      <a-row class="items" :gutter="20">
        <a-col :span="6">
          <div class="item first">
            <a-icon type="plus" />
            <span>新增项目</span>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: '#00adf7'}" type="alipay-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: '#25ba7a'}" type="wechat" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'orangered'}" type="taobao-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'skyblue'}" type="github" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'orangered'}" type="weibo-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'skyblue'}" type="alipay-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'skyblue'}" type="alipay-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="item">
            <div class="content">
              <div class="left">
                <a-icon :style="{fontSize: '34px', color: 'skyblue'}" type="alipay-circle" />
              </div>
              <div class="info">
                <h2>Alipay</h2>
                <p>
                  在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。
                </p>
              </div>
            </div>
            <div class="footer">
              <div>编辑</div>
              <div>删除</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      routes: [
        {
          path: '/',
          breadcrumbName: 'Home',
          multilingual: 'menu.home' // true(boolean) or language file attribute(string)
        },{
          breadcrumbName: 'Card',
          multilingual: 'menu.listcard'
        }
      ],
    }
  }
}
</script>

<style lang="scss">
.list-card-container{
  .items{
    display: flex;
    flex-wrap: wrap;
  }
  .ant-col-6{
    margin-bottom: 20px;
  }
  .item{
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 12px;
    line-height: 1.5;
    .content{
      display: flex;
      padding: 20px 20px 0;
      flex: 1 1 auto;
    }
    .left{
      flex: 0 0 50px;
    }
    .info{
      flex: 1 1 auto;
      p{
        @include lineover(3);
      }
    }
  }
  .first{
    display: flex;
    align-items: center;
    justify-content: center;
    border: dashed 1px #ddd;
    padding: 20px!important;
    flex-direction: row;
    span{
      margin-left: 10px;
    }
    &:hover{
      border-color: $primary-color;
      cursor: pointer;
    }
  }
  .footer{
    display: flex;
    flex: 0 0 40px;
    div{
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9f9f9;
      color: #999;
      &:hover{
        color: $primary-color;
        cursor: pointer;
      }
    }
  }
}
</style>