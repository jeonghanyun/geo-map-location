import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueGtag from 'vue-gtag'

declare global {
  // @workaround for "kakao is not defined"
  // @see https://leonkong.cc/posts/react-kakao-maps.html
  interface Window {
    kakao: any
    Clipboard: any
  }
}

const gaOptions = {
  config: {
    id: 'UA-105314165-1'
  }
}

createApp(App).use(store).use(VueGtag, gaOptions).mount('#app')
