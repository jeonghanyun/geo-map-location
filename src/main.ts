import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

declare global {
  // @workaround for "kakao is not defined"
  // @see https://leonkong.cc/posts/react-kakao-maps.html
  interface Window {
    kakao: any;
  }
}

createApp(App).use(store).mount('#app')
