import {
	getUser,
	addUser,
	getRoles,
	getUsers,
	setUserRole,
	deleteUser,
} from "./api";
import { sessions } from "./sessions";
import { ROLE } from "../constants/roleId";

export const server = {
	async logout(userSession) {
		sessions.remove(userSession);
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

		const { id, login, password, roleId } = user;
		if (authPassword !== password) {
			return {
				error: "Неверный пароль",
				res: null,
			};
		}

		return {
			error: null,
			res: {
				login: login,
				id: id,
				roleId: roleId,
				session: sessions.create(user),
			},
		};
	},

	async register(regLogin, regPassword) {
		const existedUuser = await getUser(regLogin);

		if (existedUuser) {
			return {
				error: "Этот логин уже занят",
				res: null,
			};
		}

		const user = await addUser(regLogin, regPassword);

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

	async fetchRoles(userSession) {
		const accessRoles = [ROLE.ADMIN];

		if (!sessions.access(userSession, accessRoles)) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		const roles = await getRoles();

		return {
			error: null,
			res: roles,
		};
	},

	async fetchUsers(userSession) {
		const accessRoles = [ROLE.ADMIN];
		if (!sessions.access(userSession, accessRoles)) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		const users = await getUsers();

		return {
			error: null,
			res: users,
		};
	},
	async updateUserRole(userSession, userId, newUserRoleId) {
		const accessRoles = [ROLE.ADMIN];
		if (!sessions.access(userSession, accessRoles)) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		setUserRole(userId, newUserRoleId);

		return {
			error: null,
			res: true,
		};
	},
	async removeUser(userSession, userId) {
		const accessRoles = [ROLE.ADMIN];
		if (!sessions.access(userSession, accessRoles)) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		deleteUser(userId);

		return {
			error: null,
			res: true,
		};
	},
};
