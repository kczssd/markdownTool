// const { deelChar, tokenizer, Pretreatment } = require("./compiler");
// let test = [
//     "## 你好",
//     "```js",
//     "   let a = 1;",
//     "```",
//     "我是*你好*哈***哈哈***",
//     "-----",
//     ">   你好",
//     "[github超小型编译器]:https://github.com/jamiebuilds/the-super-tiny-compi",
//     "1. hhhhh",
//     "   * xxx",
// ];
const paragraph = ["TEXT", "EMPHASIS", "STRONGEM", "STRONG"];
function parser(tokens) {
    let curr = 0;
    function turn() {
        
        let token = tokens[curr];
        if(token.type === "NEXTROW"){
            curr++;
            return {
                type:'nextrow'
            }
        }
        if (token.type === "HEADING") {
            curr++;
            return {
                type: "heading",
                value: token.value,
                depth: token.depth,
            };
        }
        if (token.type === "CODE") {
            curr++;
            return {
                type: "code",
                lang: token.lang.replace("\n", ""),
                // TODO:meta
                value: token.value,
            };
        }
        if (token.type === "THEMATICBREAK") {
            curr++;
            return {
                type: "thematicBreak",
            };
        }
        if (token.type === "DEFINITION") {
            curr++;
            return {
                type: "definition",
                identifier: token.value,
                url: token.url,
                //TODO:title
            };
        }
        if (token.type === "BLOCKQUOTE") {
            let node = {
                type: "blockquote",
                children: [],
            }; //创建父节点
            token = tokens[++curr];
            if (paragraph.includes(token?.type)) {
                let paragraphNode = { type: "paragraph", children: [] };
                node.children.push(paragraphNode);
                while (paragraph.includes(token?.type)) {
                    node.children[0].children.push(turn.bind(paragraphNode)());
                    token = tokens[curr];
                }
            }
            curr++;
            return node;
        }
        //TODO:list可以包含块级节点
        //TODO:嵌套
        if (token.type === "ORDERLIST" || token.type === "UNORDERLIST") {
            let listNode = {
                type: "list",
                ordered: token.type === "ORDERLIST",
                children: [
                    {
                        type: "listitem",
                        value: token.value,
                        children: [],
                    },
                ],
            };
            token = tokens[++curr];
            if (paragraph.includes(token?.type)) {
                let paragraphNode = { type: "paragraph", children: [] };
                while (paragraph.includes(token?.type)) {
                    paragraphNode.children.push(turn.bind(paragraphNode)());
                    token = tokens[curr];
                }
                listNode.children[0].children.push(paragraphNode);
            }
            return listNode;
        }
        if (paragraph.includes(token.type) && this?.type !== "paragraph") {
            let node = { type: "paragraph", children: [] };
            while (paragraph.includes(token?.type)) {
                node.children.push(turn.bind(node)());
                token = tokens[curr];
            }
            curr++;
            return node;
        }
        if (token.type === "TEXT") {
            curr++;
            return {
                type: "text",
                value: token.value,
            };
        }
        if (token.type === "EMPHASIS") {
            curr++;
            return {
                type: "emphasis",
                value: token.value,
            };
        }
        if (token.type === "STRONG") {
            curr++;
            return {
                type: "strong",
                value: token.value,
            };
        }
        if (token.type === "STRONGEM") {
            curr++;
            return {
                type: "strongem",
                value: token.value,
            };
        }
        curr++;
    }
    let ast = {
        type: "root",
        children: [],
    };
    while (curr < tokens.length) {
        ast.children.push(turn());
    }
    return ast;
}
export default parser;