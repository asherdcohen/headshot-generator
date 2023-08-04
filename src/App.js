import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ImageUpload from "./components/ImageUpload";
import ImageView from "./components/ImageView";
import ProfessionalButton from "./components/ProfessionalButton";
import GeneratedImage from "./components/GeneratedImage";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleImageChange = (imageData) => {
    setSelectedImage(imageData);
    setGeneratedImage(null); // Reset the generated image when the user selects a new image
  };

  const handleGeneratedImage = (generatedImageURL) => {
    setGeneratedImage(generatedImageURL);
  };

  return (
    <div className="App">
      <Navbar />
      <main className="main-container">
        <section className="left-section">
          <ImageView selectedImage={selectedImage} />
          <ImageUpload onImageChange={handleImageChange} />
          <ProfessionalButton onGeneratedImage={handleGeneratedImage} selectedImage={selectedImage} />
        </section>
        <section className="right-section">
          <GeneratedImage generatedImage={generatedImage} />
        </section>
      </main>
    </div>
  );
}

export default App;
