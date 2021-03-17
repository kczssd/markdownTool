<template>
  <div>
    <Head/>
    <Editor/>
  </div>
  
</template>

<script>
import {ref} from 'vue';
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
</style>
