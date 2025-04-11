declare global {
  interface Window {
    kakao: any
    Clipboard: any
    initMap: Promise<void>
  }
}

// 카카오맵 API 관련 설정
export const KAKAO_MAPS_API_KEY = process.env.VUE_APP_KAKAO_MAP_API_KEY || ''
export const KAKAO_MAPS_INTERVAL = 100

// 기본 좌표값 (서울시청)
export const DEFAULT_LAT = process.env.VUE_APP_DEFAULT_LAT || '37.5666805'
export const DEFAULT_LNG = process.env.VUE_APP_DEFAULT_LNG || '126.9784147'

// 지도 초기 레벨
export const MAP_LEVEL = parseInt(process.env.VUE_APP_MAP_LEVEL || '4')

// API 서비스 URL
export const API_URL = process.env.VUE_APP_API_URL || 'https://dapi.kakao.com'

// Google Analytics ID
export const GA_ID = process.env.VUE_APP_GA_ID || ''
