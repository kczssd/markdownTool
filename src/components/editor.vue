<template>
  <main id="editor">
    <section class="editor_content" style="background-color:#F8F9FA;border-right:0.5px solid #e6e6e6">
      <div contenteditable="true" ref="main_left" class="main_left" @input="output($event)"></div>
    </section>
    <section class="editor_content">
      <div contenteditable="false" ref="result" class="main_right"></div>
    </section>
  </main>
</template>

<script>
import {ref,watch} from 'vue'
import {deelChar,tokenizer,Pretreatment} from '../utils/compiler.js';
import parser from '../utils/parser.js';
import codeGenerator from '../utils/codeGenerator.js';
import {globalData,rangerSetter} from '../data/addtool.js';
import axios from 'axios';
export default {
  setup(){
    let markdownText = ref(``);
    let result = ref(null);
    let main_left = ref(null);
    let resultHtml = ``;

    watch(globalData,()=>{
      main_left.value.innerHTML+=globalData[globalData.length-1];
      main_left.value.focus();
      rangerSetter(globalData[globalData.length-1],main_left.value.lastChild.length,main_left.value.lastChild);
    })
    let deelLastLinefeed = function(string){
      return string.replace(/\n\n/g,'\n')
    }//处理因为换行时，自动在下一行生成的\n
    let output = function(event){
      markdownText.value = event.target.outerText;
      resultHtml=deelAST(deelLastLinefeed(markdownText.value).split('\n'));
      result.value.innerHTML = resultHtml;
    };
    function deelAST(markdownText){
      return codeGenerator(parser(deelChar(tokenizer(Pretreatment(markdownText)))))
    }
    
    return {
      markdownText,
      output,
      result,
      resultHtml,
      main_left,
      sendData
    }
  }
}
</script>


<style lang="scss" scoped>
@import url('../assets/css/markdown.css');
#editor{
  height: 90vh;
  overflow: hidden;
  width: 100%;
  display: flex;
}
.editor_content{
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.main_left{
  line-height: 29px;
}
.main_left,.main_right{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 1em;
  padding: 10%;
}
</style>
