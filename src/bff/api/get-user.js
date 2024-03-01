import { transformUser } from "../transformers";

export const getUser = async (regOrAuthLogin) =>
	fetch(`http://localhost:3005/users?login=${regOrAuthLogin}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
