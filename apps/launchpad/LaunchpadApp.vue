<template>
  <div class="app">
    <div class="app-icon">{{ app[0].toUpperCase() }}</div>
    <div class="app-name">{{ app }}</div>
  </div>
</template>
<script>
function djb2(str) {
  var hash = 5381
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i) /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  const hash = djb2(str)
  const g = (hash & 0xFF0000) >> 16
  const b = (hash & 0x00FF00) >> 8
  const r = hash & 0x0000FF
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2)
}

const inv = (hex) => '#' + hex.match(/[a-f0-9]{2}/ig).map(e => (255 - parseInt(e, 16) | 0).toString(16).replace(/^([a-f0-9])$/, '0$1')).join('')

export default {
  name: 'LaunchpadApp',
  props: {
    app: { type: String, required: true }
  },
  computed: {
    bgColor() {
      return hashStringToColor(this.app)
    },
    color() {
      if (!this.bgColor) {
        return 'black'
      }
      return inv(this.bgColor)
    },
    fadedBgColor() {
      return this.bgColor + '4d'
    }
  }
}
</script>
<style scoped>
.app {
  display: flex;
  grid-gap: 0.5rem;
  width: 10rem;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.app:hover {
  background-color: v-bind(fadedBgColor);
  cursor: pointer;
}
.app-icon {
  color: #fff;
  background-color: v-bind(bgColor);
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  opacity: 1;
}
.app-name {
  color: white;
  display: flex;
  justify-content: center;
}
</style>