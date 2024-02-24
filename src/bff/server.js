import {
	getUser,
	addUser,
	getRoles,
	getUsers,
	setUserRole,
	deleteUser,
	getPost,
	addComment,
	getComments,
	deleteComment,
	updatePost,
	deletePost,
} from "./api";
import { sessions } from "./sessions";
import { ROLE } from "../constants/roleId";
import { addPost } from "./api/add-post";

export const server = {
	async logout(hash) {
		sessions.remove(hash);
	},

	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

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

	async fetchRoles(hash) {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.access(hash, accessRoles);

		if (!access) {
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

	async fetchUsers(hash) {
		const accessRoles = [ROLE.ADMIN];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
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
	async updateUserRole(hash, userId, newUserRoleId) {
		const accessRoles = [ROLE.ADMIN];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
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
	async removeUser(hash, userId) {
		const accessRoles = [ROLE.ADMIN];
		if (!sessions.access(hash, accessRoles)) {
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
	async fetchPost(hash, postId) {
		const post = await getPost(postId);
		const users = await getUsers();
		const comments = await getComments(postId);

		const commentsWithAuthor = await comments.map((comment) => {
			const user = users.find(({ id }) => id === comment.authorId);

			return {
				...comment,
				author: user?.login,
			};
		});

		return {
			error: null,
			res: {
				...post,
				comments: commentsWithAuthor,
			},
		};
	},
	async addCommentToPost(hash, userId, postId, content) {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		await addComment(userId, postId, content);

		const post = await getPost(postId);
		const users = await getUsers();
		const comments = await getComments(postId);

		const commentsWithAuthor = await comments.map((comment) => {
			const user = users.find(({ id }) => id === comment.authorId);

			return {
				...comment,
				author: user?.login,
			};
		});

		return {
			error: null,
			res: {
				...post,
				comments: commentsWithAuthor,
			},
		};
	},
	async removeComment(hash, postId, id) {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		await deleteComment(id);

		const post = await getPost(postId);
		const comments = await getComments(postId);

		return {
			error: null,
			res: {
				...post,
				comments,
			},
		};
	},
	async savePost(hash, newPostData) {
		const accessRoles = [ROLE.ADMIN];

		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}
		const updatedPost = await updatePost(newPostData);

		return {
			error: null,
			res: updatedPost,
		};
	},
	async removePost(hash, id) {
		const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		await deletePost(id);

		const comments = await getComments(id);

		await Promise.all(
			comments.map(({ id: commentId }) => deleteComment(commentId)),
		);

		return {
			error: null,
			res: true,
		};
	},
	async addNewPost(hash, postData) {
		const accessRoles = [ROLE.ADMIN];
		const access = await sessions.access(hash, accessRoles);

		if (!access) {
			return {
				error: "Доступ запрещен",
				res: null,
			};
		}

		const post = await addPost(postData);

		return {
			error: null,
			res: post,
		};
	},
};
