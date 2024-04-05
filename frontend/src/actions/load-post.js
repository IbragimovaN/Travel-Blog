import { request } from "../utils/request";
import { setPostData } from "./setPostData";

export const loadPost = (postId) => (dispatch) =>
	request(`/posts/${postId}`, "GET").then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}
		return postData;
	});
