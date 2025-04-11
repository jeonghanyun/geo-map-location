import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueGtag from 'vue-gtag'
import { GA_ID } from '@/config/env'

declare global {
  // @workaround for "kakao is not defined"
  // @see https://leonkong.cc/posts/react-kakao-maps.html
  interface Window {
    kakao: any
    Clipboard: any
    initMap: Promise<void>
  }
}

const gaOptions = {
  config: {
    id: GA_ID
  }
}

// 카카오맵 API 초기화 프로미스 생성
window.initMap = new Promise<void>((resolve) => {
  window.kakao = window.kakao || {}
  window.kakao.maps = window.kakao.maps || {}
  
  if (document.getElementById('kakao-sdk')) {
    resolve()
    return
  }
  
  const script = document.createElement('script')
  script.id = 'kakao-sdk'
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`
  script.async = true
  
  script.onload = () => {
    window.kakao.maps.load(() => {
      resolve()
    })
  }
  
  document.head.appendChild(script)
})

createApp(App).use(store).use(VueGtag, gaOptions).mount('#app')
