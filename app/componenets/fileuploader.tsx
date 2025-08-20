import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="mx-auto w-full gradient-border">
      <div className="w-full" {...getRootProps()}>
        <input {...getInputProps()} />

        {file ? (
          <div
            className="uploader-selected-file"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center space-x-3">
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <p className="text-sm text-grey-700 font-medium max-w-xs truncate">
                {file.name}
              </p>
            </div>
            <button
              className="cursor-pointer p-2"
              onClick={(e) => {
                onFileSelect?.(null);
              }}
            >
              <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 " />
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto w-full space-y-4 cursor-pointer mb-2">
              <div className="mx-auto w-16 h-16 flex items-center justify-center">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
            </div>
            <p className="text-lg text-grey-500">
              <span className="font-semibold">Click to Upload</span> or drag and
              drop
            </p>
            <p className="text-lg text-grey-500">PDF (max 20 MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
