import { getUsers } from "./get-users";

export const getUser = async (regOrAuthLogin) => {
	const users = await getUsers();
	return users.find(({ login }) => login === regOrAuthLogin);
};
