import seedrandom from "seedrandom"
import {BASE_DATE, DEFAULT_SEED} from "./constants"
import {
  UZBEKISTAN_FEMALE_NAMES,
  UZBEKISTAN_FEMALE_SURNAMES,
  UZBEKISTAN_MALE_NAMES,
  UZBEKISTAN_MALE_SURNAMES
} from "./uz"
import {
  Country,
  DateOnly,
  Gender,
  IGdprPersonGenerator,
  IPerson,
  Seed
} from "./types"
import {formatDate} from "./utils"

export class GdprPersonGenerator implements IGdprPersonGenerator {
  constructor (readonly country: Country = "uzbekistan") {}

  generatePerson (
    seed: Seed = DEFAULT_SEED,
    gender: Gender = "female",
    isMuture = true
  ): IPerson {
    seedrandom(seed.toString(), {
      "global": true
    })

    return {
      "dob": this.getDoB(isMuture).toString(),
      "name": this.getName(gender),
      "surname": this.getSurname(gender)
    }
  }

  private getName (gender: Gender): string {
    return this.getRandomObjectFrom(this.getNameCollection(gender))
  }

  private getSurname (gender: Gender): string {
    return this.getRandomObjectFrom(this.getSurnameCollection(gender))
  }

  private getDoB (isMuture: boolean): DateOnly {
    const subtractEighteenYears = isMuture
    return this.generateRandomDate(subtractEighteenYears)
  }

  private getRandomObjectFrom (collection: string[]): string {
    const len = collection.length
    const index = Math.floor(Math.random() * len)
    return collection[index]
  }

  private getNameCollection (gender: Gender): string[] {
    if (this.country === "uzbekistan") {
      if (gender === "male") {
        return UZBEKISTAN_MALE_NAMES
      } else if (gender === "female") {
        return UZBEKISTAN_FEMALE_NAMES
      }
    }
  }

  private getSurnameCollection (gender: Gender): string[] {
    if (this.country === "uzbekistan") {
      if (gender === "male") {
        return UZBEKISTAN_MALE_SURNAMES
      } else if (gender === "female") {
        return UZBEKISTAN_FEMALE_SURNAMES
      }
    }
  }

  private generateRandomDate (shouldSubtractEighteenYears: boolean): DateOnly {
    const yearsToSubtract = shouldSubtractEighteenYears
      ? 18
      : 10
    const start = new Date(BASE_DATE.toString())
    const end = new Date()
    end.setFullYear(new Date().getFullYear() - yearsToSubtract)
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

    return formatDate(randomDate)
  }
}
