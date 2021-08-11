import React, { Component } from 'react';
// import { convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';


// const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

// class EditorConvertToJSON extends Component {
//   constructor(props:any) {
//     super(props);
//     const contentState = convertFromRaw(content);
//     this.state = {
//       contentState,
//     }
//   }

//   onContentStateChange: Function = (contentState:any) => {
//     this.setState({
//       contentState,
//     });
//   };

//   render() {
//     const { contentState } :any = this.state;
//     return (
//       <div>
//         <Editor
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onContentStateChange={this.onContentStateChange}
//         />
//         <textarea
//           disabled
//           value={JSON.stringify(contentState, null, 4)}
//         />
//       </div>
//     );
//   }
// }


{/* <Controller
                                        name="content"
                                        control={control}
                                        render={({field: { onChange, onBlur, value, name}}) => {
                                            return (
                                                <Editor 
                                                    editorState={htmlToDraft(textHint1)}
                                                    editorClassName=" bg-white px-4"
                                                    wrapperClassName="border-4 bg-white"
                                                    onEditorStateChange={(editorState) => {console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))}}
                                                    onBlur={onBlur}
                                                />
                                            )
                                        }}
                                    /> */}
                                    {/* <Controller
                                        as={<WYSIWYGEditor/>}
                                        control={control}
                                        name="content"
                                        defaultValue=""
                                    /> */}
                                    {/* <Editor
                                        editorClassName=" bg-white px-4"
                                        wrapperClassName="border-4 bg-white"
                                        // editorState={htmlToDraft(textHint1)}

                                        onEditorStateChange={newState => {
                                            console.log(draftToHtml(convertToRaw(newState.getCurrentContent())))
                                        }}
                                        onChange={e => {
                                            console.log()
                                        }}

                                        
                                        

                                        
                                        // id="textHint1"
                                        // editorState={htmlToDraft(textHint1)}
                                        // onEditorStateChange={(value) => con}
                                        // toolbar={{
                                        //     image: {}
                                        // }}
                                        // editorState={htmlToDraft(textHint1)}
                                        // onChange={onChange}
                                    /> */}