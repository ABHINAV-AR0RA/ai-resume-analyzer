import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatSize} from "~/lib/utils";

interface FileUploaderProps{
    onFileSelect?:(file:File | null) => void;
}

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
    //const [file, setFile] = useState()
    const onDrop = useCallback((acceptedFiles:File[]) => {
        const file=acceptedFiles[0] || null;
        // Do something with the files
        onFileSelect?.(file);
    }, [onFileSelect])
    const maxFileSize=20*1024*1024;
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple:false,
        accept:{'application/pdf':['.pdf']},
        maxSize: maxFileSize,
    })

    const file=acceptedFiles[0]||null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">

                    {file?(
                        <div className="uploader-selected-file" onClick={(e)=>e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10" />
                        <div className="flex items-center space-x-3">
                            <div>
                            <p className="text-sm max-w-xs text-gray-700 font-medium truncate">
                                {file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {formatSize(file.size)}
                            </p>

                            </div>
                        </div>
                            {/*<button className="p-2 cursor-pointer" onClick={(e)=>*/}
                            {/*{onFileSelect?.(null)}}>*/}
                            {/*    <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>*/}
                            {/*</button>*/}
                            {/*this is not working the code below will work*/}

                            <button
                                type="button"
                                className="p-2 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    (acceptedFiles as File[]).length = 0; // safely clear dropzone's internal files
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                            {/*Why It Works*/}

                            {/*TypeScript sees acceptedFiles as readonly, so we cast it temporarily to File[].*/}

                            {/*Then we reset its length to 0, which clears the files.*/}

                            {/*react-dropzone re-renders → file preview disappears.*/}

                            {/*You can now click or drag again to upload a new file immediately.*/}

                        </div>

                    ):(
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20"/>
                            </div>
                            <p className="text-lg text-gray-500 ">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-lg text-gray-500 ">
                                PDF (max {formatSize(maxFileSize)})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
