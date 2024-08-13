// @see https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord
export interface KakaoAddress {
  address: {
    // eslint-disable-next-line camelcase
    address_name: string,
    // eslint-disable-next-line camelcase
    b_code?: string,
    // eslint-disable-next-line camelcase
    h_code?: string,
    // eslint-disable-next-line camelcase
    main_address_no: string,
    // eslint-disable-next-line camelcase
    mountain_yn: 'Y' | 'N',
    // eslint-disable-next-line camelcase
    region_1depth_name: string,
    // eslint-disable-next-line camelcase
    region_2depth_name: string,
    // eslint-disable-next-line camelcase
    region_3depth_h_name?: string,
    // eslint-disable-next-line camelcase
    region_3depth_name: string,
    // eslint-disable-next-line camelcase
    sub_address_no: string,
    // eslint-disable-next-line camelcase
    underground_yn: 'Y' | 'N',
    x?: string,
    y?: string
  }
  // eslint-disable-next-line camelcase
  address_name?: string
  // eslint-disable-next-line camelcase
  address_type?: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR' // 지명, 도로명, 지번주소, 도로명주소
  // eslint-disable-next-line camelcase
  road_address: {
    // eslint-disable-next-line camelcase
    address_name: string,
    // eslint-disable-next-line camelcase
    building_name: string,
    // eslint-disable-next-line camelcase
    main_building_no: string,
    // eslint-disable-next-line camelcase
    region_1depth_name: string,
    // eslint-disable-next-line camelcase
    region_2depth_name: string,
    // eslint-disable-next-line camelcase
    region_3depth_name: string,
    // eslint-disable-next-line camelcase
    region_4depth_name: string,
    // eslint-disable-next-line camelcase
    road_name: string,
    // eslint-disable-next-line camelcase
    sub_building_no: string,
    // eslint-disable-next-line camelcase
    underground_yn: 'Y' | 'N',
    x?: string,
    y?: string,
    // eslint-disable-next-line camelcase
    zone_no: string
  }
  x?: string
  y?: string
}
