// const {AST} = require('./parser.js')
function codeGenerator(node) {
    switch (node.type) {
        case "root":
            return node.children.map(codeGenerator).join("\n");
        case "heading":
            return `<h${node.depth}>${node.value.replace(/\s$/, "")}</h${node.depth}>`;
        case "code":
            return `<pre><code lang='${node.lang}'>${node.value}</code></pre>`;
        case "paragraph":
            return `<p>${node.children.map(codeGenerator).join("")}</p>`
        case "text":
            return `<span>${node.value}</span>`
        case "nextrow":
            return;
        case "linefeed":
            return `<p class="linefeed"></p>`
        case "emphasis":
            return `<em>${node.value}</em>`
        case "strong":
            return `<strong>${node.value}</strong>`
        case "strongem":
            return `<strong><em>${node.value}</em></strong>`
        case "blockquote":
            return `<blockquote>${node.children.map(codeGenerator).join("")}</blockquote>`
        case "thematicBreak":
            return `<hr>`
        case "list":
            if(node.ordered){
                return `<ol>${node.children.map(codeGenerator).join("")}</ol>`
            }else{
                return `<ul>${node.children.map(codeGenerator).join("")}</ul>`
            }
        case "listitem":
            return `<li>${node.children.map(codeGenerator).join("")}</li>`
    }
}
export default codeGenerator