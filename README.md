## GitBot Webhook

GitBot is a Node.js webhook that connects GitHub repositories to a Discord channel, automatically sending notifications about pushed commits.

### About

GitBot is a webhook project developed using Node.js that integrates GitHub repositories with a Discord channel. It receives push events from GitHub and sends formatted messages about commits to Discord. The project includes support for OAuth2 authentication to interact with the Discord API. It was created to practice backend development, working with webhooks, APIs, and real-time notifications, providing hands-on experience with Node.js and event-driven programming.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/user/gitbot.git
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

<br>
<p align="center" style="opacity:0.6;">
MIT License – see the <a href="LICENSE">LICENSE</a> file for details.
</p>



