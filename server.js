const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer();


// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // allow session cookie from browser to pass through
//     exposedHeaders: ['x-auth-token']
// };

const corsOptions = {
    origin: '*',
    methods: ["GET", "POST"]
};


// Use cors middleware before all other middleware
app.use(cors(corsOptions));

app.post("/edit-image", upload.single("image"), async (req, res) => {
    const image = req.file;
    const prompt = req.body.prompt;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/images/edits",
            image.buffer,
            {
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                params: {
                    "prompt": prompt,
                }
            }
        );

        if (response.status === 200) {
            res.json(response.data);
        } else {
            res.status(response.status).json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
