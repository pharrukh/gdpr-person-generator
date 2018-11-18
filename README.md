# gdpr-person-generator

Anonymization tool to comply with EU data protection law, GDRP.

## How-To

```javascript

const GdprPersonGenerator = require('gdpr-person-generator')
const generator = new GdprPersonGenerator('uzbekistan')
const seed = 'some-seed-of-your-choice'
const person = generator.generatePerson(seed, 'male')

```

You must get the following result because of the seed "some-seed-of-your-choice"

```json
{ 
  "name": "Samad",
  "surname": "Ergashev",
  "dob": "1967-11-26T18:39:11.318Z" 
}
```

## Limitations

  - only "uzbeksitan" is among the supported countries
  - only first name, last name and date of birth are generated
  - only deterministic approach