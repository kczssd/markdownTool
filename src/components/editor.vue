<template>
  <main id="editor">
    <div contenteditable="true" class="main_left" @input="output($event)"></div>
    <div contenteditable="false" ref="result" class="main_right"></div>
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


<style scoped>
#editor{
  width: 100vw;
  display: flex;
}
.main_left,.main_right{
  flex: 1;
  height: 90vh;
  border: 1px solid gold;
  font-size: 30px;
}
</style>
