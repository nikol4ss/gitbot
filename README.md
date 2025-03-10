# GitBot

GitBot is a webhook to integrate GitHub repositories with a Discord channel, automatically notifying about pushed commits.

## Features
- Receives push events from GitHub via webhook.
- Sends formatted messages about commits to a Discord channel.
- Supports OAuth2 authentication for interaction with the Discord API.

## Requirements
- Node.js installed (>=14.x recommended)
- A configured Discord bot
- A configured GitHub webhook

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-user/gitbot.git
   cd gitbot
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure the `.env` file inside the `config/` folder:
   ```env
   PORT=3000
   DISCORD_BOT_TOKEN=your_token_here
   DISCORD_CHANNEL_ID=channel_id
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   REDIRECT_URI=https://your-domain.com/oauth2/callback
   ```

4. Start the server:
   ```sh
   npm start
   ```

## Setting up the GitHub Webhook
1. In your GitHub repository, go to **Settings > Webhooks**.
2. Click on **Add webhook**.
3. In the **Payload URL** field, enter `http://your-server/github-webhook`.
4. Select the **application/json** method.
5. Choose the **Just the push event** option.
6. Click **Add webhook**.

## OAuth2 Authentication
GitBot also supports authentication via OAuth2 to enable interaction with the Discord API. The authentication flow starts by accessing:
```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=bot applications.commands webhook.incoming guilds
```

## Project Structure
```
gitbot/
│── config/
│   │── .env         # Environment variables file
│── src/
│   │── monitor.js   # Main code
│── package.json
│── Dockerfile
│── .gitignore
│── README.md
```

## License
This project is licensed under the MIT License. Feel free to modify and use it.
