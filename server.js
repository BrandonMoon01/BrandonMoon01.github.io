// server.js
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser'; 

dotenv.config();
console.log("Using OpenAI API Key:", process.env.OPENAI_API_KEY);

const app = express();
app.use(express.json());
app.use(express.static('.'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

// Resolve the __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.post('/get-channel-recommendations', async (req, res) => {
    const userSearchInput = req.body.prompt;
    
    try {
        // Fetch the content of the 312_channels.txt file
        const channelsListResponse = await fetch('https://raw.githubusercontent.com/BrandonMoon01/BrandonMoon01.github.io/main/312_channels.txt');
        const channelsListText = await channelsListResponse.text();

        const prompt = `Given the list of YouTube channels: ${channelsListText}, suggest 5 channels similar to "${userSearchInput}" that are only contained in the list I gave you and format it by only printing out the channel names each on a new line.`;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: prompt }]
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
