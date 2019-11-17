<template>
  <div>
    <breadcrumb :routes="routes"></breadcrumb>
    <div class="detail-default-container">
      <div class="tags">
        <a-tag>山峦</a-tag>
        <a-tag>蝰蛇</a-tag>
        <a-tag>斑马</a-tag>
      </div>
      <div class="createtime"><a-icon type="clock-circle" /> 2019-12-23</div>
      <h1>山后的世界</h1>
      <div class="content">
        <p>
          一天早晨，当格雷戈萨姆萨从噩梦中醒来时，他发现自己在床上变成了一只可怕的害虫。他躺在盔甲般的背上，如果稍微抬起头，他就能看到他棕色的腹部，有点圆拱，被拱门分割成僵硬的部分。床上用品几乎盖不住，似乎随时都可以滑下来。他的许多腿，和其他人的腿比起来，瘦得可怜，他望着四周，无助地挥舞着。”我怎么了？”他想。那不是梦。他的房间虽然有点小，但却是一个真正的人的房间，安静地坐落在四堵熟悉的墙之间。桌上摆着一堆纺织品样品——萨姆萨是一名旅行推销员——上面挂着一张他最近从一本插图杂志上剪下的照片，放在一个漂亮的镀金框架里。照片中，一位女士戴着一顶皮帽，坐着一头皮包，举着一个厚厚的皮包，盖住了她整个下胳膊，面向观众。然后格雷戈转过身去看窗外阴沉的天气。滴
        </p>
        <p>
          在遥远的山峦后面，远离沃卡里亚和辅音的国家，有着盲文。他们分居在Bookmarksgrove的语义海岸，一个巨大的语言海洋。一条名叫杜丹的小河从他们的住处流过，为那里提供了必要的雷格里亚河。这是一个自相矛盾的国家，烤过的句子会飞进你的嘴里。
        </p>
        <p>    
          大牛津建议她不要这样做，因为有成千上万的坏逗号，野生问号和狡猾的塞米科利，但小盲文不听。她把她的七个范思哲莉亚包好，把她的首字母放进腰带里，然后自己走了。当她到达斜体山脉的第一座小山时，她最后一次看到了家乡Bookmarksgrove的天际线、Alphabet村的标题和她自己道路的次线，线车道。可怜的是，她脸上掠过一个发回的问题，
        </p>
        <p>
          两个开车的运动员帮我传真我的大测验。快，巴兹，把我织的亚麻麻布拿过来！”现在传真测验杰克！”我勇敢的鬼魂打褶了。五个嘎嘎作响的西风吹动了我的蜡床。被工作搞糊涂了，抱怨W。扎普伊拉克。舒适的狮身人面像挥动着一夸脱的坏牛奶。一个很坏的庸医可能会使敏捷的家禽倒霉。很少有俏皮话刺激了模拟陪审团。快速的棕色狗跳过懒惰的狐狸。杰伊，猪，狐狸，斑马，还有我的狼在呱呱叫！狂风呼啸的红色毒蛇争先恐后地跳跃。华金凤凰被MTV盯着看运气。巫师的工作是在大雾中迅速激怒笨蛋。看“危险，亚历克斯·特雷贝克有趣的电视问答游戏。机织丝绸睡衣换成蓝色石英。强壮的神
        </p>
        <p>
          砖头测验什么跳跃的维尔特福克斯。明亮的蝰蛇跳跃；昏昏欲睡的鸟呱呱叫。疾风拂面，惊动了勇敢的吉姆。快的风吹，烦躁的吉姆。性收费的fop搞砸了我的垃圾电视测试。跳斑马的速度有多快。
        </p>
      </div>
      <a-divider />
      <div class="footer">
        <a-icon type="eye" /> 144 浏览量
      </div>
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
          breadcrumbName: 'Detail',
          multilingual: 'menu.detailarticle'
        }
      ],
    }
  }
}
</script>

<style lang="scss">
.detail-default-container{
  background: #fff;
  min-height: 500px;
  max-width: 960px;
  margin: 0 auto;
  padding: 50px;
  .tags{
    display: flex;
    justify-content: flex-end;
  }
  h1{
    text-align: center;
  }
  .createtime{
    text-align: center;
    color: #999;
  }
  .content{
    line-height: 1.7;
    font-size: $font-size-base * 1.1;
    margin: 2em 0;
  }
  .footer{
    color: #999;
  }
}
</style>