# JAS
A javascript app server.

# Quick start
1. Download project for your platform.
2. Unzip.
3. Open terminal in `/src` folder.
4. Execute `../node/v20.15.0-darwin-x64/bin/node ./server/jas.js`
- If necessary, download Node.js for your system and modify the path.

# Start on startup
1. Use `install.sh` to copy `localhost.jas.plist` to `LaunchAgents` folder.
   1. Note: server cannot be located in a "Restricted" MacOS folder (Documents, Desktop, etc.)
   2. `jas.sh` must be executable by the current user.

# Files
- apps - files for apps
- server - files for server

# Apps
- create app folder in /apps.
- index.html required in app folder.

## Downloadable apps
- Tic Tac Toe
- Rogue