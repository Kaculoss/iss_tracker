import { PureAbility, AbilityClass } from "@casl/ability";
import type { Actions, Subjects } from "./abilities";

export type AppAbility = PureAbility<[Actions, Subjects]>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AppAbility = PureAbility as AbilityClass<AppAbility>;
