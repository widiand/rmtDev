import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import SortingControls from "./SortingControls";
import ResultsCount from "./ResultsCount";
import { useDebounced, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { Direction, SortBy } from "../lib/types";

function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounced(searchText, 250);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
		if (sortBy === "relevant") return b.relevanceScore - a.relevanceScore;
		if (sortBy === "recent") return a.daysAgo - b.daysAgo;
		return 0;
	});
	const jobItemsSliced =
		jobItemsSorted?.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
		) || [];
	const totalJobItems = jobItems?.length || 0;
	const totalPages = Math.ceil(totalJobItems / RESULTS_PER_PAGE);

	const handlePageChange = (direction: Direction) => {
		if (direction === "next") setCurrentPage(currentPage + 1);
		if (direction === "prev") setCurrentPage(currentPage - 1);
	};
	const handleSortByChange = (sortBy: SortBy) => {
		setCurrentPage(1);
		setSortBy(sortBy);
	};

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalJobItems={totalJobItems} />
						<SortingControls
							sortBy={sortBy}
							onSortByChange={handleSortByChange}
						/>
					</SidebarTop>
					<JobList jobItems={jobItemsSliced} isLoading={isLoading} />
					<Pagination
						currentPage={currentPage}
						onClick={handlePageChange}
						totalPages={totalPages}
					/>
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
			<Toaster position="top-right" />
		</>
	);
}

export default App;
