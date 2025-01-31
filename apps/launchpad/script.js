async function getApps() {
  const apiUrl = 'http://' + window.location.host + '/apps'
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .catch(error => {
      console.error('Error:', error)
    })
}

const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile(url) {
    const res = await fetch(url)
    if (!res.ok)
      throw Object.assign(new Error(res.statusText + ' ' + url), { res })
    return {
      getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
    }
  },
  addStyle(textContent) {
    const style = Object.assign(document.createElement('style'), { textContent })
    const ref = document.head.getElementsByTagName('style')[0] || null
    document.head.insertBefore(style, ref)
  },
}
const { loadModule } = window['vue3-sfc-loader']

window.launchpad = {}
window.launchpad.init = () => {
  getApps().then(loadedApps => {
    const { createApp, ref } = Vue
    createApp({
      components: {
        'LaunchpadApp': Vue.defineAsyncComponent( () => loadModule('./LaunchpadApp.vue', options) )
      },
      setup() {
        const apps = ref(loadedApps.filter(a => a !== 'launchpad'))
        const handleAppClick = (id) => {
          window.location.href = window.location.origin + '/' + id
        }
        const out = {
          apps,
          handleAppClick
        }
        Object.keys(out).forEach(key => {
          window.launchpad[key] = out[key]
        })
        return out
      }
    }).mount('#app')  
  })
}

window.launchpad.init()