import { SHA3 } from "sha3";

export function hashPassword(password: string): string {
	const hash = new SHA3(512);
	hash.update(password.toString());
	return hash.digest("base64");
}
