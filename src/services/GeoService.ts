import store from '@/store'
import { KakaoAddress } from '@/models/KakaoAddress'
import { Address } from '@/models/Address'

export class GeoService {
  private geocoder

  constructor() {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder
    this.geocoder = new window.kakao.maps.services.Geocoder()
  }

  updateStateByAddress(input: string): void {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch
    this.geocoder.addressSearch(input, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const src: KakaoAddress = result[0]
        store.commit('setAddress', this.map(src))
      } else {
        store.commit('setError', `주소 검색 실패: ${status}`)
      }
    })
  }

  updateStateByCoords(x: string, y: string): void {
    // @see https://apis.map.kakao.com/web/documentation/#services_Geocoder_coord2Address
    this.geocoder.coord2Address(x, y, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const src: KakaoAddress = result[0]
        store.commit('setAddress', this.map(src, x, y))
      } else {
        store.commit('setError', `좌표 검색 실패: ${status}`)
      }
    })
  }

  private map(src: KakaoAddress, x?: string, y?: string): Address {
    const address: Address = {
      legalAddress: src.address.address_name,
      legalCode: src.address.b_code,
      adminCode: src.address.h_code,
      coords: {
        x: src.x ?? x,
        y: src.y ?? y
      }
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
