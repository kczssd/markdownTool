import { reactive } from "vue";
const map = new Map([
    ["heading1", "# "],
    ["heading2", "## "],
    ["heading3", "### "],
    ["heading4", "#### "],
    ["heading5", "##### "],
    ["heading6", "###### "],
    ["strong", "****"],
    ["emphsis", "**"],
    ["blockquote", "> "],
    ["code", "``````"],
    ["orderList", "1. "],
    ["unorderList", "+ "],
    ["thematicBreak","---"]
]);
const reverseMap = new Map(Array.from(map).map((item) => item.reverse()));
function addTool(id) {
    return map.get(id);
}
export function rangerSetter(value, length, node) {
    let ranger = getSelection().getRangeAt(0);
    let type = reverseMap.get(value);
    if (type === "emphsis") {
        ranger.setStart(node, length - 1);
    } else if (type === "strong") {
        ranger.setStart(node, length - 2);
    } else if(type === "code"){
        ranger.setStart(node, length - 3);
    } 
    else {
        ranger.setStart(node, length);
    }
}
export let globalData = reactive([]);
export default addTool;
