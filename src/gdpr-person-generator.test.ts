import {GdprPersonGenerator} from "./gdpr-person-generator"
import {IPerson, Seed} from "./types"

test("deterministically returns the same male person", () => {
  const seed = new Seed("male_person_one")
  const generator = new GdprPersonGenerator()

  const person = generator.generatePerson(seed, "male")
  assert(person, "Javohir", "Mamurov")

  const person2 = generator.generatePerson(seed, "male")
  assert(person2, "Javohir", "Mamurov")
})

test("deterministically returns the same female person", () => {
  const seed = new Seed("feemale_person_2")
  const generator = new GdprPersonGenerator()

  const person = generator.generatePerson(seed, "female")
  assert(person, "Zuhro", "Usmanova")

  const person2 = generator.generatePerson(seed, "female")
  assert(person2, "Zuhro", "Usmanova")
})

function assert (
  actualPerson: IPerson,
  expectedName: string,
  expectedSurname: string
) {
  expect(actualPerson.name).toBe(expectedName)
  expect(actualPerson.surname).toBe(expectedSurname)
}
