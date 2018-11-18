const GdprPersonGenerator = require('./index')
const MODE = 'test'

test('deterministically returns a male person', () => {
  const generator = new GdprPersonGenerator('uzbekistan');
  const person = generator.generatePerson('male_person_one', 'male');
  if (MODE === 'debug') console.log(person)
  expect(person.name).toBe("Behzod")
  expect(person.surname).toBe("Akhmadiev")

});

test('deterministically returns a female person', () => {
  const generator = new GdprPersonGenerator('uzbekistan');
  const person = generator.generatePerson('feemale_person_2', 'female');
  if (MODE === 'debug') console.log(person)
  expect(person.name).toBe("Yigitoy")
  expect(person.surname).toBe("Ibraimova")
});