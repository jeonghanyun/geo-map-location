<template>
  <div class="panel panel-default">
    <div class="map-wrapper pannel-body">
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { GeoService } from '@/services/GeoService'
import { DEFAULT_LAT, DEFAULT_LNG, MAP_LEVEL } from '@/config/env'

const store = useStore()
const geoService = ref<GeoService | null>(null)

const container = ref<HTMLElement | null>(null)
const center = ref<any>(null)
const map = ref<{
  setCenter:(center: any) => void
  addControl: (control: any, position: any) => void
  setCopyrightPosition: (postion: any, show: boolean) => void
    } | null>(null)
const marker = ref<{
  setPosition:(position: any) => void
  getPosition: () => any
  setMap: (map: any) => void
  setDraggable: (draggable: boolean) => void
    } | null>(null)

store.watch(
  (state) => state.address,
  (address) => {
    if (window.kakao?.maps && map.value && marker.value) {
      center.value = new window.kakao.maps.LatLng(address.coords.y, address.coords.x)
      map.value.setCenter(center.value)
      marker.value.setPosition(center.value)
    }
  },
  { deep: true }
)

onMounted(async () => {
  try {
    // 카카오맵 API가 로드될 때까지 대기
    await window.initMap
    
    if (window.kakao && window.kakao.maps) {
      const mapElement = document.querySelector('div#map')
      if (!mapElement) {
        console.error('지도 요소를 찾을 수 없습니다')
        return
      }
      
      container.value = mapElement as HTMLElement
      
      // 환경 변수에서 기본 좌표값 가져오기
      const defaultLat = DEFAULT_LAT || store.state.address.coords.y
      const defaultLng = DEFAULT_LNG || store.state.address.coords.x
      
      center.value = new window.kakao.maps.LatLng(defaultLat, defaultLng)
      
      console.log('지도 생성 시작', { container: container.value, center: center.value })
      
      // 먼저 지도 생성
      map.value = new window.kakao.maps.Map(container.value, {
        center: center.value,
        level: MAP_LEVEL
      })

      console.log('지도 생성 완료', map.value)

      // 마커 즉시 생성
      marker.value = new window.kakao.maps.Marker()
      
      if (marker.value && map.value) {
        // 마커 옵션 설정
        marker.value.setMap(map.value) // 지도에 마커 추가
        marker.value.setPosition(center.value) // 마커 위치 설정
        marker.value.setDraggable(true) // 드래그 가능하도록 설정
        
        console.log('마커 생성 완료', marker.value)
      }
      
      // GeoService 인스턴스 가져오기
      geoService.value = await GeoService.getInstance()

      // 마커 드래그 이벤트 리스너
      if (marker.value) {
        window.kakao.maps.event.addListener(marker.value, 'dragend', () => {
          if (marker.value && geoService.value) {
            const position = marker.value.getPosition()
            geoService.value.updateStateByCoords(position.getLng(), position.getLat())
          }
        })
      }

      if (map.value) {
        map.value.addControl(new window.kakao.maps.MapTypeControl(), window.kakao.maps.ControlPosition.TOPRIGHT)
        map.value.setCopyrightPosition(window.kakao.maps.CopyrightPosition.BOTTOMRIGHT, true)
      }
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
