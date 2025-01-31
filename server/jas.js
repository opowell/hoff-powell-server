import express from 'express'
import path from 'path'
import { getApps, processApps } from './processApps.js'
import { getServerPath } from './getServerPath.js'
import { createServer } from 'node:http'
import { readFileSync } from 'fs'
import ip from 'ip'

const serverPath = getServerPath()
const importedSettingsPath = path.join(serverPath, '/settings.json')
const importedSettings = JSON.parse(readFileSync(importedSettingsPath, 'utf8'))
if (!importedSettings.appsPath) {
  importedSettings.appsPath = 'apps'
}
const expressApp = express()
const port = importedSettings.port || 3000
const httpServer = createServer(expressApp)

const appsPath = path.join(serverPath, importedSettings.appsPath)
const defaultAppPath = path.join(appsPath, importedSettings.defaultApp)
expressApp.use('/', express.static(defaultAppPath))
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(defaultAppPath, 'index.html'))
})

processApps(expressApp, appsPath)

expressApp.get('/apps', (req, res) => {
  res.json(getApps(appsPath))
})

const url = ip.address()
httpServer.listen(port, () => {
  console.log(`JAS - http://${url}:${port}`)
})
