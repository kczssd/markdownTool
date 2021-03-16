<template>
  <main id="editor">
    <section class="editor_content" style="background-color:#F8F9FA">
      <div contenteditable="true" class="main_left" @input="output($event)"></div>
    </section>
    <section class="editor_content">
      <div contenteditable="false" ref="result" class="main_right"></div>
    </section>
  </main>
</template>

<script>
import {ref} from 'vue'
import {deelChar,tokenizer,Pretreatment} from '../utils/compiler.js';
import parser from '../utils/parser.js';
import codeGenerator from '../utils/codeGenerator.js';

export default {
  setup(){
    let markdownText = ref(``);
    let result = ref(null)
    let resultHtml = ``;
    let output = function(event){
      markdownText.value = event.target.outerText;
      console.log(markdownText.value.split('\n'));
      resultHtml=deelAST(markdownText.value.split('\n').filter(item=>item!==""));
      console.log(resultHtml)
      result.value.innerHTML = resultHtml;
    };
    function deelAST(markdownText){
      return codeGenerator(parser(deelChar(tokenizer(Pretreatment(markdownText)))))
    }
    return {
      markdownText,
      output,
      result,
      resultHtml
    }
  }
}
</script>


<style lang="scss" scoped>
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
.main_left{border-right:0.5px solid #FAFBFC}
.main_left,.main_right{
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 30px;
  padding: 10%;
}
</style>
