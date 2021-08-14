declare const SeedType: unique symbol

export class Seed {
  readonly value: string;

  [SeedType]: void;

  constructor (value: string) {
    if (this.isValid(value)) {
      this.value = value
    } else {
      throw new Error(`Seed should be longer than 4 characters, ${value.length} were provided.`)
    }
  }

  toString (): string {
    return this.value
  }

  private isValid (value: string) {
    return value.length >= 4
  }
}

declare const DateOnlyType: unique symbol

export class DateOnly {
  readonly value: string;

  [DateOnlyType]: void;

  constructor (value: string) {
    if (this.isValid(value)) {
      this.value = value
    } else {
      throw new Error(`Incorrect value provided ("${value}"). It is expected to have the following format "yyyy-mm-dd"`)
    }
  }

  toString (): string {
    return this.value
  }

  private isValid (value: string) {
    /* eslint-disable-next-line */
    return (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).test(value);

  }
}

export type Gender = "male" | "female";

export interface IPerson {
  name: string;
  surname: string;
  dob: string;
}

export interface IGdprPersonGenerator {
  generatePerson(seed: Seed, gender: Gender, isMuture?: boolean): IPerson;
}

export type Country = "uzbekistan";
