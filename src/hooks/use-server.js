import { useSelector } from "react-redux";
import { useCallback } from "react";
import { selectUserSession } from "../selectors/selectors";
import { server } from "../bff/server";

export const useServer = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ["register", "authorize", "fetchPost"].includes(operation)
				? params
				: [...params];

			return server[operation](session, ...request);
		},
		[session],
	);
};
