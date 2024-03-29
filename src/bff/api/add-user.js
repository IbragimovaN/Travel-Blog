import { generateDate } from "../utills/generate-date";

export const addUser = (regLogin, regPassword) =>
	fetch("http://localhost:3005/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			login: regLogin,
			password: regPassword,
			registered_at: generateDate(),
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
