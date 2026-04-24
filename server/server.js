require('dotenv').config({ path: '../../../../.env' }); // Adjust depending on deploy env
const express = require('express');
const { twiml } = require('twilio');
const Retell = require('retell-sdk');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize Retell Client
const retellClient = new Retell({
    apiKey: process.env.RETELL_API_KEY,
});

/**
 * 1. INBOUND CALL HANDLER (The Shield)
 * Twilio hits this URL when someone dials the +18305901130 number.
 */
app.post('/twilio-voice-webhook', async (req, res) => {
    try {
        console.log(`Incoming call from ${req.body.From}`);

        // Register the call with Retell to get a dedicated WebSocket URL
        const callResponse = await retellClient.call.register({
            agent_id: process.env.RETELL_AGENT_ID,
            audio_websocket_protocol: 'twilio',
            audio_encoding: 'mulaw',
            sample_rate: 8000
        });

        // Tell Twilio to answer the call and stream the audio to Retell's WebSocket
        const response = new twiml.VoiceResponse();
        const connect = response.connect();
        connect.stream({
            url: callResponse.audio_websocket_url,
        });

        res.type('text/xml');
        res.send(response.toString());
    } catch (error) {
        console.error('Error handling incoming call:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * 2. SMS COMMAND HANDLER (The Dispatcher)
 * Twilio hits this URL when you text commands to the AI.
 */
app.post('/twilio-sms-webhook', async (req, res) => {
    const incomingMsg = req.body.Body;
    const fromNumber = req.body.From;
    
    console.log(`Received SMS command from ${fromNumber}: "${incomingMsg}"`);
    
    // For V1, we just acknowledge receipt. 
    // Next iteration: Parse the intent and trigger an outbound Retell call.
    const response = new twiml.MessagingResponse();
    response.message(`Nexus Receptionist received command: "${incomingMsg}". I am standing by.`);
    
    res.type('text/xml');
    res.send(response.toString());
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI Receptionist Bridge Server running on port ${PORT}`);
    console.log(`Configured with Agent ID: ${process.env.RETELL_AGENT_ID}`);
});
