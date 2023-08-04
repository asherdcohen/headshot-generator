// src/components/GeneratedImage.js
import React from "react";

function GeneratedImage({ generatedImage, onSave }) {
    return (
        <div className="image-container">
            {generatedImage && <img src={generatedImage} alt="Generated" />}
            {generatedImage && <button onClick={() => onSave(generatedImage)}>Save Image</button>}
        </div>
    );
}

export default GeneratedImage;
