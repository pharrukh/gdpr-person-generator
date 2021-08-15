# gdpr-person-generator

Anonymization tool to comply with EU data protection law, GDRP.

## How-To

```typescript
const { GdprPersonGenerator, Seed } = require("gdpr-person-generator");
// import { GdprPersonGenerator } from "gdpr-person-generator");

const seed = new Seed("some-seed-of-your-choice");
const generator = new GdprPersonGenerator(seed);
const person = generator.generatePerson("male");
```

You must get the following result because of the seed "some-seed-of-your-choice"

```json
{
  "dob": "1988-03-28",
  "name": "Samad",
  "surname": "Niyazov"
}
```

## Limitations

- only "uzbeksitan" is among the supported countries
- only first name, last name and date of birth are generated
- only deterministic approach

## TODOs

- automate publication to merges to master
- add version bumping based on convensional commits
