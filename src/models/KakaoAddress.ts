// @see https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord
export interface KakaoAddress {
  address: {
    address_name: string,
    b_code?: string,
    h_code?: string,
    main_address_no: string,
    mountain_yn: 'Y' | 'N',
    region1DepthName: string,
    region2DepthName: string,
    region3DepthName?: string,
    region4DepthName: string,
    sub_address_no: string,
    x?: string,
    y?: string
  }
  address_name?: string
  address_type?: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR' // 지명, 도로명, 지번주소, 도로명주소
  road_address: {
    address_name: string,
    building_name: string,
    main_building_no: string,
    region1DepthName: string,
    region2DepthName: string,
    region3DepthName: string,
    region3DepthHName: string,
    road_name: string,
    sub_building_no: string,
    underground_yn: 'Y' | 'N',
    x?: string,
    y?: string,
    zone_no: string
  }
  x?: string
  y?: string
}
