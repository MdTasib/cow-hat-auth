import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// CREATE TOKEN
const createToken = (
	payload: Record<string, unknown>,
	secret: Secret,
	expireTime: string
): string => {
	return jwt.sign(payload, secret, {
		expiresIn: expireTime,
	});
};

// VERIFY TOKEN
const verifyToken = (token: string, secret: Secret): JwtPayload => {
	return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
	createToken,
	verifyToken,
};
