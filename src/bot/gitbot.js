  require('dotenv').config();
  const express = require('express');
  const bodyParser = require('body-parser');
  const axios = require('axios');
  const { Client, GatewayIntentBits } = require('discord.js');

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());

  const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });

  const commitMessage = (commit, repository) => {
    return `${commit.message}\n${commit.committer.name || "Unknown Author"} committed on ${repository}\n${commit.url}`;
  };

  app.post('/github-webhook', async (req, res) => {
    console.log('Request body:', req.body);
  
    const event = req.headers['x-github-event'];
    const repository = req.body.repository?.name || "Unknown Repository";
    const channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    let message = '';
  
    if (event === 'push') {
      const commit = req.body.head_commit;
      message = commitMessage(commit, repository);
    }
  
    if (channel && message.trim()) {
      channel.send(message);
    } else {
      console.log('Empty message not sent');
    }
  
    res.status(200).send('OK');
  });
  
  app.get('/oauth2/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
      return res.status(400).send('No code');
    }

    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'bot applications.commands webhook.incoming guilds',
    };

    try {
      const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      res.send('Auth successful!');
    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).send('Auth error');
    }
  });

  discordClient.once('ready', () => {
    console.log('GitBot On');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    discordClient.login(process.env.DISCORD_BOT_TOKEN);
  });
