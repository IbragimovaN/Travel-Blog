export const getUsers = () => {
	return fetch("http://localhost:3005/users").then((loadedUsers) =>
		loadedUsers.json(),
	);
};
