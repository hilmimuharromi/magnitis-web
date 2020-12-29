import React, { useState } from "react"
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';

export default function EditorContainer() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    function uploadImageCallBack(file) {
        console.log("file", file)
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID 1ec9ba58f65058a');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response)
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    console.log(error)
                    reject(error);
                });
            }
        );
    }
    return (
        <div className='editor'>
            <Editor
                wrapperClassName="demo-wrapper"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbarStyle={{ width: "100%" }}
                editorStyle={{ height: "500px", overflow: "auto" }}
                editorState={editorState}
                onEditorStateChange={(value) => {
                    console.log("value editor", value)
                    setEditorState(value)
                }}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
            <textarea
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>
    )
}