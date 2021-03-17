//对输入的markdown文本数组进行每一行的预处理
// let test = ["n", "", ""]
function Pretreatment(preInput) {
    return preInput.map((row) => (row += "\n"));
}
function tokenizer(input) {
    let curr = 0,
        row = 0;
    let tokens = []; //指示器数组
    while (row < input.length) {
        let rowInput = input[row];
        curr = 0;
        //块级元素
        //heading
        let HEADING = /^#{1,6}\s*.*\s/;
        if (HEADING.test(rowInput)) {
            let value = rowInput.match(HEADING);
            let depth = value[0].match(/^#*/)[0].length;
            tokens.push({
                type: "HEADING",
                value: value[0].slice(depth).replace(/^\s*/, ""),
                depth,
            });
            row++;
            continue;
        }
        //thematicbreak
        let BREAK = /(^-{3,}|^\*{3,})\n/;
        if (BREAK.test(rowInput)) {
            let value = rowInput.match(BREAK);
            tokens.push({ type: "THEMATICBREAK", value: value[0] });
            row++;
            continue; //直接下一行
        }
        //code
        let CODE = /```\s|```\w{1,}\s/;
        if (CODE.test(rowInput)) {
            let lang = rowInput.match(CODE);
            let value = '';
            rowInput = input[++row];
            while(!CODE.test(rowInput)&&rowInput){
                value+=rowInput;
                rowInput = input[++row];
            }
            tokens.push({
                type: "CODE",
                lang: lang[0].slice(3) === "\n" ? "test\n" : lang[0].slice(3),
                value
            });
            row++;
            continue;
        }
        //definition
        let DEFINITION = /\[.{1,}\]:\s{0,}.{0,}\s/;
        if (DEFINITION.test(rowInput)) {
            let value = rowInput.match(DEFINITION);
            let preurl = value[0].slice(value[0].indexOf("]") + 1);
            let url = preurl.slice(preurl.match(/^:\s{0,}/)[0].length);
            tokens.push({
                type: "DEFINITION",
                value: value[0].slice(1, value[0].indexOf("]")),
                url: url,
            });
            row++;
            continue;
        }
        while (curr < rowInput.length) {
            let char = rowInput[curr];
            //whitespace
            //TODO:空格处理
            //行级元素
            //blockquote
            let BLOCKQUOTE = /^>\s{1,}/;
            if (BLOCKQUOTE.test(rowInput) && char === ">") {
                let value = rowInput.match(BLOCKQUOTE);
                tokens.push({ type: "BLOCKQUOTE", value: value[0] });
                curr += value[0].length;
                continue;
            }
            //orderlist
            let ORDERLIST = /^\s{0,}([0-9]\.\s)/;
            if (ORDERLIST.test(rowInput) && curr === 0) {
                let value = rowInput.match(ORDERLIST);
                tokens.push({ type: "ORDERLIST", value: value[0] });
                curr += value[0].length;
                continue;
            }
            //unorderlist
            let UNORDERLIST = /^\s{0,}(\+|-|\*)\s/;
            if (UNORDERLIST.test(rowInput) && curr === 0) {
                let value = rowInput.match(UNORDERLIST);
                tokens.push({ type: "UNORDERLIST", value: value[0] });
                curr += value[0].length;
                continue;
            }
            //strongem
            let STRONGEM = /(\*\*\*)[^*]{1,}(\*\*\*)/;
            if (
                STRONGEM.test(rowInput.slice(curr)) &&
                char === "*" &&
                rowInput[curr + 1] === "*" &&
                rowInput[curr + 2] === "*"
            ) {
                let value = rowInput.slice(curr).match(STRONGEM);
                tokens.push({
                    type: "STRONGEM",
                    value: value[0].replace(/\*\*\*/g, ""),
                });
                curr += value[0].length;
                continue;
            }
            //strong
            let STRONG = /(\*\*)[^*]{1,}(\*\*)/;
            if (
                STRONG.test(rowInput.slice(curr)) &&
                char === "*" &&
                rowInput[curr + 1] === "*"
            ) {
                let value = rowInput.slice(curr).match(STRONG);
                tokens.push({
                    type: "STRONG",
                    value: value[0].replace(/\*\*/g, ""),
                });
                curr += value[0].length;
                continue;
            }
            //emphasis
            let EMPHASIS = /\*[^*]{1,}\*/;
            if (EMPHASIS.test(rowInput.slice(curr)) && char === "*") {
                let value = rowInput.slice(curr).match(EMPHASIS);
                tokens.push({
                    type: "EMPHASIS",
                    value: value[0].replace(/\*/g, ""),
                });
                curr += value[0].length;
                continue;
            }
            //text
            if (char.match(/./)) {
                tokens.push({
                    type: "TEXT",
                    char,
                });
            }
            if(char.match(/\n/)){
                if(rowInput.length===1){
                    tokens.push({
                        type: "LINEFEED"
                    })
                }else{
                    tokens.push({
                        type: "NEXTROW",
                    });
                }
            }
            curr++;
        }
        row++;
    }
    return tokens;
}
function deelChar(tokens) {
    let curr = 0,
        count = 0,
        startIndex = 0,
        value = "";
    while (tokens[curr]) {
        if (tokens[curr]["char"]) {
            count++;
            startIndex = value===""?curr:startIndex;
            value += tokens[curr]["char"];           
        } else {
            if (value !== "") {
                tokens.splice(startIndex, count, {
                    type: "TEXT",
                    value,
                });
                curr -= count - 1;
            }
            count = startIndex = 0;
            value = "";
        }
        curr++;
    }
    if (value !== "") {
        tokens.splice(startIndex, count, {
            type: "TEXT",
            value,
        });
    }
    return tokens;
}
// console.log(deelChar(tokenizer(Pretreatment(test))))
export {deelChar,tokenizer,Pretreatment}