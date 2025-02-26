require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = process.env.PORT || 3000;

const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

discordClient.login(process.env.DISCORD_BOT_TOKEN);

discordClient.once('ready', () => {
  console.log('🤖 GitBot está online!');
});

app.use(bodyParser.json());

app.use('/github-webhook', async (req, res) => {
  const event = req.headers['x-github-event'];
  const repository = req.body.repository?.name || "Unknown Repository";
  const channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL_ID);

  let message = ' ';

  if (event === 'push') {
    const commit = req.body.head_commit;
    const author = commit.committer.name || "Unknown Author";
    message = `**Repo** ${repository}\n**Commit** ${commit.message}\n**Author** ${author}\n${commit.url}`;
  } else if (event === 'pull_request') {
    const author = req.body.pull_request.user?.login || "Unknown Author";
    message = `**PR** ${repository}\n**Merge** ${req.body.pull_request.title}\n**Author** ${author}\n${req.body.pull_request.html_url}`;
  } 

  if (channel && message) {
    channel.send(message);
  }

  res.status(200).send('OK');
});

app.get('/oauth2/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code received');
  }

  const data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'bot applications.commands webhook.incoming guilds'
  };

  try {
    const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const accessToken = response.data.access_token;

    res.send('Autenticação concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao trocar o código de autorização por token:', error);
    res.status(500).send('Erro ao autenticar.');
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
