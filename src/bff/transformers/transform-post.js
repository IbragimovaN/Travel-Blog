export const transformPost = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	imgUrl: dbPost.image_url,
	content: dbPost.content,
	publishedAt: dbPost.published_at,
});
