import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import axios from "axios";

function ProfessionalButton({ onGeneratedImage, selectedImage }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleProfessionalButtonClick = async () => {
        if (!selectedImage) {
            console.error("No image selected.");
            return;
        }

        setIsLoading(true);

        const prompt = "a photo of a person with a professional background and clothing";
        console.log("Prompt:", prompt);

        try {
            // Build form data
            const formData = new FormData();
            formData.append("image", selectedImage);
            formData.append("prompt", prompt);

            // Send request to server
            const response = await axios.post("http://localhost:5000/edit-image", formData, { withCredentials: true });

            if (response.status === 200) {
                // Get the generated image URL from the API response
                const generatedImageURL = response.data.url;
                onGeneratedImage(generatedImageURL);
            } else {
                console.error("API call failed:", response.data);
                // Handle error scenarios
            }
        } catch (error) {
            console.error("Error processing image with DALL-E:", error);
            // Handle error scenarios
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <button className="make-professional-btn" onClick={handleProfessionalButtonClick} disabled={isLoading}>
            {isLoading ? "Processing..." : "Make me look professional 😎"}
        </button>
    );
}

export default ProfessionalButton;


// import React, { useState } from "react";
// import axios from "axios";

// function ProfessionalButton({ onGeneratedImage, selectedImage }) {
//     const [isLoading, setIsLoading] = useState(false);

//     const handleProfessionalButtonClick = async () => {
//         if (!selectedImage) {
//             console.error("No image selected.");
//             return;
//         }

//         setIsLoading(true);

//         const prompt = "a photo of a person with a professional background and clothing";

//         try {
//             // Assuming selectedImage is base64-encoded image data
//             const imageToProcess = selectedImage.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

//             const apiEndpoint = "https://api.openai.com/v1/images/edits";
//             const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//             const formData = new FormData();
//             formData.append("image", imageToProcess);
//             formData.append("prompt", prompt);

//             const response = await axios.post(apiEndpoint, formData, {
//                 headers: {
//                     Authorization: `Bearer ${apiKey}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             if (response.status === 200) {
//                 // Get the generated image URL from the API response
//                 const generatedImageURL = response.data.changes[0].generated_image_url;
//                 onGeneratedImage(generatedImageURL);
//             } else {
//                 console.error("API call failed:", response.data);
//                 // Handle error scenarios
//             }
//         } catch (error) {
//             console.error("Error processing image with DALL-E:", error);
//             // Handle error scenarios
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <button className="make-professional-btn" onClick={handleProfessionalButtonClick} disabled={isLoading}>
//             {isLoading ? "Processing..." : "Make me look professional 😎"}
//         </button>
//     );
// }

// export default ProfessionalButton;
