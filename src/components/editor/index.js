import React, { useState, useEffect } from "react"
import { EditorState, } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import Iframe from "./Iframe"
import { connect } from 'react-redux';
import { ResetEditor } from "stores/action"
import { FromHtml, ToHtml } from "utils/draftConvert"
function EditorContainer(props) {
    const { data, setData, heightEditor, } = props
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        if (data) {
            console.log('dari html', data)
            setEditorState(FromHtml(data))
        }
        // return () => {
        //     setEditorState(EditorState.createEmpty())
        // }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!data) {
            setEditorState(EditorState.createEmpty())
        }
    }, [data])

    // useEffect(() => {
    //     if (isReset) {
    //         setEditorState(EditorState.createEmpty())
    //         ResetEditor(false)
    //     }
    // }, [isReset])

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

    function handleEmbed(str) {
        console.log("embed", str)
        if (str.startsWith("<iframe")) {
            const start = str.search("src=")
            const end = str.indexOf(`"`, start + 5)
            return str.substring(start + 5, end);
        } else return str
    }
    return (
        <>
            <div className='editor' style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbarStyle={{ width: "100%" }}
                    editorStyle={{ height: heightEditor || "500px", overflow: "auto" }}
                    wrapperStyle={{ borderStyle: "inset" }}
                    editorState={editorState}
                    onEditorStateChange={(value) => {
                        setEditorState(value)
                        setData(ToHtml(editorState))
                    }}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        embedded: {
                            embedCallback: handleEmbed,
                            defaultSize: {
                                height: '500px',
                                width: '80%',
                            }
                        },
                        image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true },
                    }}
                // toolbarCustomButtons={[<Iframe />]}
                />
            </div>
        </>

    )
}

const mapStateToProps = state => {
    const { Editor } = state;
    const { reset } = Editor
    return {
        isReset: reset
    };
}
const mapDispatchToProps = {
    ResetEditor
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);