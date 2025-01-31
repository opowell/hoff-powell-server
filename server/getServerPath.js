import path from 'path'
const getServerPath = () => {
  if (process.argv[0].indexOf('node') > -1) {
    return process.cwd()
  }
  return path.dirname(process.execPath)
}

export {
  getServerPath
}