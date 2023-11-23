// server.js
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
console.log("Using OpenAI API Key:", process.env.OPENAI_API_KEY);

const app = express();
app.use(express.json());

app.use(express.static('.'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

// Resolve the __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.post('/get-channel-recommendations', async (req, res) => {
    const userSearchInput = req.body.prompt; // This is the text from the search bar input
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant providing YouTube channel recommendations."
                    },
                    {
                        role: "user",
                        content: `Give me YouTube channels similar to ${userSearchInput}.`
                    }
                ]
            }),
        });
        const data = await response.json();
        const recommendationText = data.choices[0].message.content;
        res.json({ recommendationText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching recommendations.');
    }
});

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
