import {GdprPersonGenerator} from './gdpr-person-generator'
import {IPerson, Seed} from './types'

test('deterministically returns the same male person', () => {
  const seed = new Seed('male_person_one')
  const generator = new GdprPersonGenerator(seed)

  const person = generator.generatePerson('male')
  assert(person, 'Behzod', 'Abdullayev')

  const person2 = generator.generatePerson('male')
  assert(person2, 'Behzod', 'Abdullayev')
})

test('deterministically returns the same female person', () => {
  const seed = new Seed('feemale_person_2')
  const generator = new GdprPersonGenerator(seed)

  const person = generator.generatePerson('female')
  assert(person, 'Yigitoy', 'Islamova')

  const person2 = generator.generatePerson('female')
  assert(person2, 'Yigitoy', 'Islamova')
})

test('should show example as in readme', () => {
  const seed = new Seed('some-seed-of-your-choice')
  const generator = new GdprPersonGenerator(seed)

  const person = generator.generatePerson('male')

  assert(person, 'Samad', 'Niyazov')
  expect(person.dob).toEqual('1987-11-02')
})

function assert (
  actualPerson: IPerson,
  expectedName: string,
  expectedSurname: string
) {
  expect(actualPerson.name).toBe(expectedName)
  expect(actualPerson.surname).toBe(expectedSurname)
}
