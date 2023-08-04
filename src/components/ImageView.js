import React from "react";

function ImageView({ selectedImage }) {
    return selectedImage ? <img src={selectedImage} alt="Uploaded" /> : null;
}

export default ImageView;
