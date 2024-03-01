import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useServer } from "../../hooks/use-server";
import { PostCard, Pagination } from "./main-components";
import { PAGINATION_LIMIT } from "../../constants/pagination-limit";
import { getLastPageFromLink } from "./utils/get-last-page-from-link";
import { Search } from "../../components";
import { debounce } from "../../components/utills/debounce";

export const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState("");

	const requestServerFun = useServer();

	useEffect(() => {
		requestServerFun("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				if (posts.error) {
					return;
				}

				setPosts(posts);

				setLastPage(getLastPageFromLink(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServerFun, posts.error, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(({ id, title, publishedAt, imgUrl, commentsCount }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							imgUrl={imgUrl}
							commentsCount={commentsCount}
						/>
					))}
				</div>
			) : (
				<div className="post-not-found">Ничего не найдено</div>
			)}
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};
export const Main = styled(MainContainer)`
	& .post-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	? .post-not-found {
		text-align: center;
	}
`;
