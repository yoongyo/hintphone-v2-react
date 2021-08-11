import React from 'react';
import { FileUploader } from './uploader';

export const HintEditor = ({index, code}:any) => {
    
    return (
        <div className="mt-12 rounded-3xl p-5 border-4 border-secondary">
            <div className="text-white text-2xl -mt-10 bg-primary w-48 text-center">Hint {index+1} ({code})</div>
            <form method="POST" className="flex">
                <div className="flex-1 p-6 mx-1">
                    <div className="mb-2">
                        <label className="text-xl text-white">Main Hint </label>
                        <textarea name={`main`+index} className="border-2 border-gray-500" value="fuck"/>
                    </div>
                    <FileUploader/>
                </div>
                <div className="flex-1 p-6 mx-1">
                    <div className="mb-2">
                        <label className="text-xl text-white">Sub Hint </label>
                        <textarea name={`sub`+index} className="border-2 border-gray-500"/>
                    </div>
                    <FileUploader/>
                </div>
            </form>
        </div>
    )
}
