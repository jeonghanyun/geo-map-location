<template>
  <div class="panel panel-default">
    <div class="map_wrap pannel-body">
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { GeoService } from '@/services/GeoService'

const kakao = window.kakao
const store = useStore()
const geoService = new GeoService()

let container = null
let center = null
let map = null
let marker = null

onMounted(() => {
  container = document.querySelector('div#map')
  // @see https://apis.map.kakao.com/web/documentation/#LatLng
  center = new kakao.maps.LatLng(store.state.address.coords.y, store.state.address.coords.x)

  // @see https://apis.map.kakao.com/web/documentation/#Map
  map = new kakao.maps.Map(container, {
    center: center,
    level: 3
  })

  // 지도 중앙에 마커를 표시한다
  // @see https://apis.map.kakao.com/web/documentation/#Marker
  marker = new kakao.maps.Marker({
    map: map,
    position: center
  })

  window.kakao.maps.event.addListener(map, 'click', (evt) => {
    // 클릭 이벤트 리스너를 등록한다
    console.log('x:', evt.latLng.getLng(), 'y:', evt.latLng.getLat())
    center = new kakao.maps.LatLng(evt.latLng.getLat(), evt.latLng.getLng())
    map.setCenter(center)
    marker.setPosition(center)

    // store를 업데이트 한다
    geoService.updateStateByCoords(evt.latLng.getLng(), evt.latLng.getLat())
  })
})
</script>

<style scoped>
.map_wrap {
  position: relative;
  width: 100%;
  height: 480px;
}

#map {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
