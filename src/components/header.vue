<template>
  <header id="head">
      <section id="title">
        <input type="text" v-model="Title" name="title" id="title_content" placeholder="请输入标题">
      </section>
      <ul id="fnList">
        <li id="heading">

        </li>
        <li id="blockquote">

        </li>
        <li id="emphsis">

        </li>
        <li id="strong">

        </li>
        <li id="code">

        </li>
        <li id="orderList">

        </li>
        <li id="unorderList">

        </li>
        <!-- TODO:link相关 -->
        <!-- <li id="link"></li>
        <li id="img"></li> -->
      </ul>
  </header>
</template>

<script>
import {ref} from 'vue';
export default {
  name:"editor_head",
  setup(){
    let Title = ref('');
    return {
      Title
    }
  }
}
</script>

<style lang="scss" scoped>
#head{
  height: auto;
  width: 100%;
}
#title{
  min-height: 49.5px;
  width: 100%;
  #title_content{
    border: none;
    outline: none;
    font-size: 2em;
    text-align: left;
    line-height: 50px;
    margin-left: 10px;
  }
}
#fnList{
  height: 20px;
  width: 100%;
  background-color: #FAFBFC;
  border-top: 0.5px solid #e6e6e6;
  border-bottom: 0.5px solid #e6e6e6;
}
</style>