import { SortBy } from "../lib/types";

type SortingControlsProps = {
	sortBy: SortBy;
	onSortByChange: (sortBy: SortBy) => void;
};

export default function SortingControls({
	sortBy,
	onSortByChange,
}: SortingControlsProps) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<SortingButton
				sortByState={sortBy}
				sortBy="relevant"
				onSortByChange={onSortByChange}
			/>
			<SortingButton
				sortByState={sortBy}
				sortBy="recent"
				onSortByChange={onSortByChange}
			/>
		</section>
	);
}

type SortingButtonProps = {
	sortByState: SortBy;
	sortBy: SortBy;
	onSortByChange: (sortBy: SortBy) => void;
};

const SortingButton = ({
	sortByState,
	sortBy,
	onSortByChange,
}: SortingButtonProps) => {
	return (
		<button
			onClick={() => onSortByChange(sortBy)}
			className={`sorting__button sorting__button--${sortBy} ${
				sortByState === sortBy && "sorting__button--active"
			}`}
		>
			{sortBy}
		</button>
	);
};
