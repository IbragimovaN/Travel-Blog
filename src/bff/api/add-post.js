export const addPost = ({ title, imgUrl, content, publishedAt }) =>
	fetch("http://localhost:3005/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			title: title,
			image_url: imgUrl,
			content: content,
			published_at: publishedAt,
		}),
	}).then((createdPost) => createdPost.json());
