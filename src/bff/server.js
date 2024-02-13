import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { sessions } from "./sessions";

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);
		console.log(user);

		if (!user) {
			return {
				error: "Пользователь не найден",
				res: null,
			};
		}
		if (authPassword !== user.password) {
			return {
				error: "Неверный пароль",
				res: null,
			};
		}
		console.log(user.login);
		return {
			error: null,
			res: {
				login: user.login,
				id: user.id,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async register(regLogin, regPassword) {
		const user = getUser(regLogin);

		if (user) {
			return {
				error: "Этот логин уже занят",
				res: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				login: user.login,
				id: user.id,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
