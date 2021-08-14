import {Country, DateOnly, Seed} from "./types"

export const SUPPORTED_COUNTRIES: Country[] = ["uzbekistan"]
export const DEFAULT_SEED = new Seed("C-137")

/**
 * Minimal date of birth
 */
export const BASE_DATE: DateOnly = new DateOnly("1960-01-01")
