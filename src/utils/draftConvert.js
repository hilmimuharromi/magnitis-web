import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, EditorState } from "draft-js";

function FromHtml(html) {
    console.log("data html", html)
    const blocksFromHtml = htmlToDraft(html);
    const contentBlocks = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    const editorState = EditorState.createWithContent(contentState)
    const result = EditorState.acceptSelection(editorState, editorState.getSelection())
    return result
}

function ToHtml(value) {
    let html = draftToHtml(convertToRaw(value.getCurrentContent()))
    return html
}

export {
    ToHtml,
    FromHtml
}