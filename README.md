# gdpr-person-generator

Anonymization tool to comply with EU data protection law, GDRP.

## How-To

```typescript
const { GdprPersonGenerator } = require("gdpr-person-generator");
// import { GdprPersonGenerator } from "gdpr-person-generator");

const generator = new GdprPersonGenerator();
const seed = "some-seed-of-your-choice";
const person = generator.generatePerson(seed, "male");
```

You must get the following result because of the seed "some-seed-of-your-choice"

```json
{
  "dob": "1988-03-27",
  "name": "Manzur",
  "surname": "Salamov"
}
```

## Limitations

- only "uzbeksitan" is among the supported countries
- only first name, last name and date of birth are generated
- only deterministic approach
