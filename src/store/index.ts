import { createStore } from 'vuex'
import { Address } from '@/models/Address'
import { Coords } from '@/models/Coords'

export default createStore({
  state: {
    address: {
      legalAddress: '서울특별시 중구 서소문동 37',
      adminAddress: '서울특별시 중구 소공동 37',
      roadAddress: '서울특별시 중구 덕수궁길 15',
      zipCode: '04515',
      legalCode: '1114016600',
      adminCode: '1114052000',
      roadCode: '111404103076',
      coords: {
        x: '126.975653509532',
        y: '37.5643639030785'
      } as Coords
    } as Address,
    error: null as string | null
  },
  mutations: {
    setAddress(state, address: Address) {
      state.address = address
    },
    setError(state, error: string | null) {
      state.error = error
    }
  },
  actions: {
  }
})
