import { request } from "../utils/request";

export const deletePostAsync = (id) => () => {
	return request(`/posts/${id}`, "DELETE");
};
