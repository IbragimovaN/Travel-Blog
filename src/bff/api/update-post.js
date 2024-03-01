export const updatePost = ({ id, title, imgUrl, content }) =>
	fetch(`http://localhost:3005/posts/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			title: title,
			image_url: imgUrl,
			content: content,
		}),
	}).then((loadedPost) => loadedPost.json());
