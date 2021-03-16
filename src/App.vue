<template>
  <div>
    <Head/>
    <Editor/>
  </div>
  
</template>

<script>
import Editor from './components/editor.vue'
import Head from './components/header.vue';

export default {
  name: 'app',
  components: {
    Editor,
    Head
  }
}
</script>

<style>
@import url('./assets/css/markdown.css'); 
ul,ol,li{
  padding: 0;
  margin:0;
  list-style: none;
}
/* *{
  margin: 0;
  padding: 0;
} */
</style>
