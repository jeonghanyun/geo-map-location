import store from '@/store'
import { KakaoAddress } from '@/models/KakaoAddress'
import { CoordsAddress } from '@/models/Address'

export class GeoService {
  private geocoder: {
    addressSearch: (input: string, callback: (result: KakaoAddress[], status: string) => void) => void,
    coord2Address: (x: string, y: string, callback: (result: KakaoAddress[], status: string) => void) => void
  }

  constructor() {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder
    this.geocoder = new window.kakao.maps.services.Geocoder()
  }

  updateStateByAddress(input: string): void {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch
    this.geocoder.addressSearch(input, (result: KakaoAddress[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const src: KakaoAddress = result[0]
        console.log(src)
        store.commit('setAddress', this.map(src))
      } else {
        store.commit('setError', `주소 검색 실패: ${status}`)
      }
    })
  }

  updateStateByCoords(x: string, y: string): void {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder_coord2Address
    this.geocoder.coord2Address(x, y, (result: KakaoAddress[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const src: KakaoAddress = result[0]
        const address = this.map(src, x, y)
        // 역지오코드 결과로 맵핑한 Address 객체는 완전하지 않으므로, 다시 지오코드해서 맵핑한다
        this.updateStateByAddress(address.legalAddress!)
      } else {
        store.commit('setError', `좌표 검색 실패: ${status}`)
      }
    })
  }

  private map(src: KakaoAddress, x?: string, y?: string): CoordsAddress {
    const address: CoordsAddress = {
      legalAddress: src.address.address_name,
      legalCode: src.address.b_code,
      adminCode: src.address.h_code,
      coords: {
        x: src.x ?? x,
        y: src.y ?? y
      }
    }

    console.log('123456789' + src.address.region_1depth_name)
    if (src.address) {
      address.region1DepthName = src.address.region_1depth_name || undefined
      address.region2DepthName = src.address.region_2depth_name || undefined
      address.region3DepthName = src.address.region_3depth_name || undefined
      address.region3DepthHName = src.address.region_3depth_h_name || undefined
    }
    if (src.road_address) {
      address.roadRegion1DepthName = src.road_address.region_1depth_name || undefined
      address.roadRegion2DepthName = src.road_address.region_2depth_name || undefined
      address.roadRegion3DepthName = src.road_address.region_3depth_name || undefined
      address.roadRegion4DepthName = src.road_address.region_4depth_name || undefined
    }
    if (src.address.region_3depth_h_name) {
      address.adminAddress = src.address.address_name.replace(src.address.region_3depth_name, src.address.region_3depth_h_name)
    }
    if (src.road_address) {
      if (src.road_address.address_name) {
        address.roadAddress = `${src.road_address.address_name} ${src.road_address.building_name}`.trim()
      }
      if (src.road_address.zone_no) {
        address.zipCode = src.road_address.zone_no
      }
    }

    return address
  }
}
