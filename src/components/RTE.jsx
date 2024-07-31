import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from "react-hook-form"



export default function RTE({name,control,label,defaultValue=""}){
    return(
        <>
           <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1 text-white text-lg">
             {label}    
            </label>}
            <Controller
             name={name || "content"}
             control={control}
             render={({field:{onChange}})=>(
                <Editor
                apiKey="psb9zfjo95t4s02juwkt0flx64982sl6nvkyy5o2zb5fdgo0"
                initialValue={defaultValue}
                init={
                    {branding:false,
                     height:500,
                     menubar:true,
                     plugins:[
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                     ],
                     toolbar:
                      'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                      content_style:"body { font-family:Helvetica, Arial,sans-serif; font-size:14px}"
                    }
                }
                onEditorChange={onChange}
               />
             )}
            />
           </div>





        {/* <Editor
        initialValue="default value"
        init={
            {branding:false,
             height:500,
             menubar:true,
             plugins:[
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
             ],
             toolbar:
              'undo redo | formatselect | bold italic backcolor | \ alignleft aligncenter alignright alignjustify | \ bullist numlist outdent indent | removeformat | help'
            }
        }
       /> */}
       {/* we are not using this approach bcse we are creating this editor component separately and we want its access in a separate component so we can achieve this by using forward ref hook as well but we will use react-hook-form controller for better design */}
        </>
    )
}