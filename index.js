const seedrandom = require('seedrandom')

const SUPPORTED_COUNTRIES = [
  'uzbekistan'
]

const {
  UZBEKISTAN_MALE_NAMES,
  UZBEKISTAN_FEMALE_NAMES,
  UZBEKISTAN_MALE_SURNAMES,
  UZBEKISTAN_FEMALE_SURNAMES
} = require('./uz')

class Guard {
  static isSupportedCountry(country) {
    if (SUPPORTED_COUNTRIES.includes(country.toLowerCase()))
      return true
    else
      throw new Error(`Unsupported country "${country}".\nList of supported ones:\n${SUPPORTED_COUNTRIES.join('\n')}`)
  }
  static doesSeedMinimizeCollisionChance(seed) {
    if (typeof seed !== 'string')
      throw new Error(`seed must be of type "string"\nYou provided "${seed}" of type "${typeof seed}"`)
    if (seed.length < 4)
      throw new Error(`Seed must be longer than 4 characters\nYou provided ${seed} of length ${seed.length}`)
    return true
  }
  static isGenderValid(gender) {
    if (!['male', 'female'].includes(gender))
      throw new Error(`Unsupported gender value "${gender}". It must be male or female.`)
    return true
  }
}

module.exports = class GdprPersonGenerator {
  constructor(country) {
    Guard.isSupportedCountry(country)
    this.country = country.toLowerCase();
  }
  generatePerson(seed, gender, isMuture) {
    Guard.doesSeedMinimizeCollisionChance(seed)
    seedrandom(seed, {
      global: true
    });
    Guard.isGenderValid(gender)
    this._setGender(gender)
    return {
      name: this._getName(),
      surname: this._getSurname(),
      dob: this._getDoB(isMuture)
    }
  }
  _setGender(gender) {
    this.gender = gender
  }
  _getName() {
    return this._getRandomObjectFrom(this._getNameCollection())
  }
  _getSurname() {
    return this._getRandomObjectFrom(this._getSurnameCollection())
  }
  _getDoB(isMuture) {
    const subtractEighteenYears = isMuture
    return this._generateRandomDate(subtractEighteenYears)
  }

  _getRandomObjectFrom(collection) {
    const len = collection.length
    const index = Math.floor(Math.random() * len)
    return collection[index]
  }
  _getNameCollection() {
    if (this.country === 'uzbekistan') {
      if (this.gender === 'male')
        return UZBEKISTAN_MALE_NAMES
      else if (this.gender === 'female')
        return UZBEKISTAN_FEMALE_NAMES
    }
  }
  _getSurnameCollection() {
    if (this.country === 'uzbekistan') {
      if (this.gender === 'male')
        return UZBEKISTAN_MALE_SURNAMES
      else if (this.gender === 'female')
        return UZBEKISTAN_FEMALE_SURNAMES
    }
  }

  //TODO: idea generate people by generation, add logic for older generation names
  _generateRandomDate(subtractEighteenYears) {
    const start = new Date('1960-01-01')
    const yearsToSubtract = subtractEighteenYears ? 18 : 10
    const end = new Date(new Date().getFullYear(new Date().getFullYear() - yearsToSubtract))
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }
}