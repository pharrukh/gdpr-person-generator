import seedrandom from 'seedrandom'
import {BASE_DATE, DEFAULT_SEED} from './constants'
import {
  UZBEKISTAN_FEMALE_NAMES,
  UZBEKISTAN_FEMALE_SURNAMES,
  UZBEKISTAN_MALE_NAMES,
  UZBEKISTAN_MALE_SURNAMES
} from './data/uz'
import {
  DateOnly,
  Gender,
  IGdprPersonGenerator,
  IPerson,
  Seed
} from './types'
import {formatDate} from './utils'

export class GdprPersonGenerator implements IGdprPersonGenerator {
  constructor (private seed: Seed = DEFAULT_SEED) {}

  generatePerson (
    gender: Gender = 'female',
    isMuture = true
  ): IPerson {
    const randomFunction = seedrandom(this.seed.toString())
    const randomNumber = randomFunction()

    return {
      'dob': this.getDoB(isMuture, randomNumber).toString(),
      'name': this.getName(gender, randomNumber),
      'surname': this.getSurname(gender, randomNumber)
    }
  }

  private getName (gender: Gender, randomNumber: number): string {
    return this.getRandomObjectFrom(this.getNameCollection(gender), randomNumber)
  }

  private getSurname (gender: Gender, randomNumber: number): string {
    return this.getRandomObjectFrom(this.getSurnameCollection(gender), randomNumber)
  }

  private getDoB (isMuture: boolean, randomNumber: number): DateOnly {
    const subtractEighteenYears = isMuture
    return this.generateRandomDate(subtractEighteenYears, randomNumber)
  }

  private getRandomIndexFrom (collection: string[], randomNumber: number): number {
    const len = collection.length
    const index = Math.floor(randomNumber * len)
    return index
  }

  private getRandomObjectFrom (collection: string[], randomNumber: number): string {
    const index = this.getRandomIndexFrom(collection, randomNumber)
    return collection[index]
  }

  private getNameCollection (gender: Gender): string[] {
    if (gender === 'male') {
      return UZBEKISTAN_MALE_NAMES
    }
    return UZBEKISTAN_FEMALE_NAMES
  }

  private getSurnameCollection (gender: Gender): string[] {
    if (gender === 'male') {
      return UZBEKISTAN_MALE_SURNAMES
    }
    return UZBEKISTAN_FEMALE_SURNAMES
  }

  private generateRandomDate (shouldSubtractEighteenYears: boolean, randomNumber: number): DateOnly {
    const yearsToSubtract = shouldSubtractEighteenYears
      ? 18
      : 10
    const start = new Date(BASE_DATE.toString())
    const end = new Date()
    end.setFullYear(new Date().getFullYear() - yearsToSubtract)
    const randomDate = new Date(
      start.getTime() + randomNumber * (end.getTime() - start.getTime())
    )

    return formatDate(randomDate)
  }
}
