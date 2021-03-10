<template>
  <div class="leftNav">
    <ul>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <p>收银</p>
      </li>
      <li>
        <i class="iconfont icon-jingxuanshichang"></i>
        <p>店铺</p>
      </li>
      <li>
        <i class="iconfont icon-zhubaoshipin"></i>
        <p>商品</p>
      </li>
      <li>
        <i class="iconfont icon-kefuyouxian"></i>
        <p>会员</p>
      </li>
      <li>
        <i  class="iconfont icon-hanbao"></i>
        <p>统计</p>
      </li>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <p>设置</p>
      </li>
      
    </ul>
  </div>
</template>


<script>
export default {
    name: 'leftNav'
};
</script>  

<style scoped>
.leftNav{
  height: 100%;
}
  ul{
    list-style: none;
    width: 40px;
    font-size: 12px;
    height: 100%;
    background-color:aquamarine;
  }
  ul li{
    padding: 5px 0;
    border-bottom: 1px solid #fff;
  }
 
  .iconfont{
    font-size: 20px;
  }
</style>>
  
</style>