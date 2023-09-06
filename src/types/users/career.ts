export interface CareersDataType {
  readonly company: string
  readonly position: string
  readonly startDate: string
  readonly endDate: string | null
}

export interface GetCareersDataType extends CareersDataType {
  readonly careerId: number
}
