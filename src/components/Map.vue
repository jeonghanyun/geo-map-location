<template>
  <div class="panel panel-default">
    <div class="map-wrapper pannel-body">
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { GeoService } from '@/services/GeoService'

const store = useStore()
const geoService = new GeoService()

let container = null
let center = null
let map = null
let marker = null

store.watch((state) => {
  return state.address
}, (address) => {
  center = new window.kakao.maps.LatLng(address.coords.y, address.coords.x)
  map.setCenter(center)
  marker.setPosition(center)
}, {
  deep: true
})

onMounted(() => {
  container = document.querySelector('div#map')

  // @see https://apis.map.kakao.com/web/documentation/#LatLng
  center = new window.kakao.maps.LatLng(store.state.address.coords.y, store.state.address.coords.x)

  // @see https://apis.map.kakao.com/web/documentation/#Map
  map = new window.kakao.maps.Map(container, {
    center: center,
    level: 4
  })

  // @see https://apis.map.kakao.com/web/documentation/#Marker
  marker = new window.kakao.maps.Marker({
    map: map,
    position: center,
    dgrggable: true
  })

  window.kakao.maps.event.addListener(map, 'click', (evt) => {
    // 클릭 이벤트 핸들러를 등록한다
    geoService.updateStateByCoords(evt.latLng.getLng(), evt.latLng.getLat())
  })
})
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 480px;
}

#map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
