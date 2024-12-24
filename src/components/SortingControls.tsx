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
				isActive={sortBy === "relevant"}
				onSortByChange={() => onSortByChange("relevant")}
			>
				relevant
			</SortingButton>
			<SortingButton
				isActive={sortBy === "recent"}
				onSortByChange={() => onSortByChange("recent")}
			>
				recent
			</SortingButton>
		</section>
	);
}

type SortingButtonProps = {
	children: React.ReactNode;
	isActive: boolean;
	onSortByChange: () => void;
};

const SortingButton = ({
	children,
	isActive,
	onSortByChange,
}: SortingButtonProps) => {
	return (
		<button
			onClick={onSortByChange}
			className={`sorting__button sorting__button--recent ${
				isActive && "sorting__button--active"
			}`}
		>
			{children}
		</button>
	);
};
