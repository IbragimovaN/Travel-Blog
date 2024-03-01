import { useSelector } from "react-redux";
import { useCallback } from "react";
import { selectUserSession } from "../selectors/selectors";
import { server } from "../bff/server";

export const useServer = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = [
				"register",
				"authorize",
				"fetchPost",
				"fetchPosts",
			].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
