import header from "./header.js"
import footer from "./footer.js"
import load from "./load.js"
import chat from "./chat.js"
export default function frame() {
    return `
        ${header()}
        ${load()}
        ${chat()}
        <div id="main" class="min-h-[50vh]">
        </div>
        ${footer()}
    `
}
