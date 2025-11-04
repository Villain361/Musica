module.exports = {
  TOKEN: process.env.TOKEN, 
  language: "en", 
  ownerID: ["1238074550097543201", ""], 
  mongodbUri : process.env.MONGO_URI,
  spotifyClientId : process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret : process.env.SPOTIFY_CLIENT_SECRET,
  setupFilePath: './commands/setup.json',
  commandsDir: './commands',  
  embedColor: "#1db954",
  activityName: "YouTube Music", 
  activityType: "LISTENING",  // Available activity types : LISTENING , PLAYING
  SupportServer: "https://discord.gg/y9tUcrb536",
  embedTimeout: 5, 
  errorLog: "", 
  private: false,  // truse or false
  nodes: [
     {
      name: "Hunter",
      password: "https://dsc.gg/ajidevserver",
      host: "lava-v4.ajieblogs.eu.org",
      port: 80,
      secure: false
    }
  ]
}
