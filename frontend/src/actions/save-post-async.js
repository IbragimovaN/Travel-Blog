import { request } from "../utils/request";
import { setPostData } from "./setPostData";

export const savePostAsync = (newPostData) => (dispatch) =>
	request(`/posts/${newPostData.id}`, "PATCH", newPostData).then(
		(updatedPost) => {
			dispatch(setPostData(updatedPost.data));
			return updatedPost.data;
		},
	);
