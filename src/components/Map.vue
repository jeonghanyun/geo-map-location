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
let map: {
  setCenter: (center: any) => void
  addControl: (control: any, position: any) => void
  setCopyrightPosition: (postion: any, show: boolean) => void
} = null
let marker: {
  setPosition: (position: any) => void
} = null

store.watch((state) => {
  return state.address
}, (address) => {
  center = new window.kakao.maps.LatLng(address.coords.y, address.coords.x)
  map.setCenter(center)
  marker.setPosition(center)
}, {
  deep: true
})

onMounted(async () => {
  try {
    await window.initMap
    
    if (window.kakao && window.kakao.maps) {
      container = document.querySelector('div#map')
      center = new window.kakao.maps.LatLng(store.state.address.coords.y, store.state.address.coords.x)
      
      console.log('지도 생성 시작', { container, center }) // 디버깅용
      
      // 먼저 지도 생성
      map = new window.kakao.maps.Map(container, {
        center: center,
        level: 4
      })

      console.log('지도 생성 완료', map) // 디버깅용

      // 마커 즉시 생성
      marker = new window.kakao.maps.Marker() // 먼저 마커 인스턴스 생성
      
      // 마커 옵션 설정
      marker.setMap(map) // 지도에 마커 추가
      marker.setPosition(center) // 마커 위치 설정
      marker.setDraggable(true) // 드래그 가능하도록 설정
      
      console.log('마커 생성 완료', marker) // 디버깅용

      // 마커 드래그 이벤트 리스너
      window.kakao.maps.event.addListener(marker, 'dragend', () => {
        const position = marker.getPosition()
        geoService.updateStateByCoords(position.getLng(), position.getLat())
      })

      map.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT)
      map.setCopyrightPosition(window.kakao.maps.CopyrightPosition.BOTTOMRIGHT, true)
    }
  } catch (error) {
    console.error('카카오맵 로드 실패:', error)
  }
})
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 780px;
}

#map {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
