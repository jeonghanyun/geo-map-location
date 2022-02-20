import { Coords } from '@/models/Coords'

export class Address {
  legalAddress?: string
  adminAddress?: string
  roadAddress?: string
  zipCode?: string
  legalCode?: string
  adminCode?: string
  roadCode?: string
  coords?: Coords

  constructor(legalAddress: string, adminAddress: string, roadAddress: string, zipCode: string, legalCode: string, adminCode: string, roadCode: string, coords: Coords) {
    this.legalAddress = legalAddress
    this.adminAddress = adminAddress
    this.roadAddress = roadAddress
    this.zipCode = zipCode
    this.legalCode = legalCode
    this.adminCode = adminCode
    this.roadCode = roadCode
    this.coords = coords
  }
}
