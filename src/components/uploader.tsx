import React, {useState} from 'react';

export const FileUploader = (hint: any) => {
    console.log(hint);
    const [fileName, setFileName] = useState("");
    const handleFileOnChange = (event:any) => {
        setFileName(event.target.files[0].name)
        event.preventDefault();
    }

    return (
        <div></div>
    )
}