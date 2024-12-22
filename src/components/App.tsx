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

function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounced(searchText, 250);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);

	const jobItemsSliced =
		jobItems?.slice(currentPage * 7 - 7, currentPage * 7) || [];
	const totalJobItems = jobItems?.length || 0;
	const totalPages = Math.ceil(totalJobItems / 7);

	const handlePageChange = (direction: "next" | "prev") => {
		if (direction === "next") setCurrentPage(currentPage + 1);
		if (direction === "prev") setCurrentPage(currentPage - 1);
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
						<SortingControls />
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
