/**
 * Valid environmental vars from .env
 */
export interface IEnvironment {
	SERVER_PORT: number;
}

/**
 * Needed to be able to strip environment from unused properties
 * (this is something like allow-list)
 *
 * There is no other way to get keys of an interface in TypeScript
 * @link https://stackoverflow.com/a/54308812
 */
type KeysEnum<T> = { [P in keyof Required<T>]: true };
export const IEnvironmentKeys: KeysEnum<IEnvironment> = {
	SERVER_PORT: true,
};
