import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationProps = {
	currentPage: number;
	onClick: (direction: "next" | "prev") => void;
	totalPages: number;
};

export default function Pagination({
	currentPage,
	onClick,
	totalPages,
}: PaginationProps) {
	return (
		<section className="pagination">
			{currentPage > 1 && (
				<PaginationButton
					direction="prev"
					onClick={onClick}
					currentPage={currentPage}
				/>
			)}
			{currentPage < totalPages && (
				<PaginationButton
					direction="next"
					onClick={onClick}
					currentPage={currentPage}
				/>
			)}
		</section>
	);
}

type PaginationButtonProps = {
	onClick: (direction: "next" | "prev") => void;
	direction: "next" | "prev";
	currentPage: number;
};

export const PaginationButton = ({
	direction,
	onClick,
	currentPage,
}: PaginationButtonProps) => {
	return (
		<button
			onClick={(event) => {
				onClick(direction);
				event.currentTarget.blur();
			}}
			className={`pagination__button pagination__button--${direction}`}
		>
			{direction === "prev" && <ArrowLeftIcon />}
			page {direction === "next" ? currentPage + 1 : currentPage - 1}
			{direction === "next" && <ArrowRightIcon />}
		</button>
	);
};
