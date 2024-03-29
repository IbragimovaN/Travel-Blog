import { removeComment } from "./sessionMethod";
import { ROLE } from "../constants/roleId";

export const createSession = (roleId) => {
	let session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment();
			break;
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment();
			break;
		}
		case ROLE.READER: {
			break;
		}
		default:
		//nothing
	}
	return session;
};
