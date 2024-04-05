import { request } from "../utils/request";
import { setPostData } from "./setPostData";

export const addPostAsync = (postData) => (dispatch) =>
	request("/posts", "POST", postData).then((newData) => {
		dispatch(setPostData(newData.data));
		return newData.data;
	});
