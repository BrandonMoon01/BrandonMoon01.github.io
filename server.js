// server.js
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
app.use(express.json());

app.use(express.static('public'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

app.post('/get-channel-recommendations', async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            }),
        });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching recommendations.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
