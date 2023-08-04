import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function ImageUpload({ onImageChange }) {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [onImageChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input {...getInputProps()} accept="image/*" />
            {isDragActive ? <p>Drop the image here...</p> : <p>Drag 'n' drop an image here, or click to select an image</p>}
        </div>
    );
}

export default ImageUpload;
