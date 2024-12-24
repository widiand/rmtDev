export type jobItem = {
	id: number;
	badgeLetters: string;
	company: string;
	daysAgo: number;
	title: string;
	relevanceScore: number;
};

export type jobItemExpanded = jobItem & {
	description: string;
	qualifications: string[];
	reviews: string[];
	duration: string;
	salary: string;
	location: string;
	coverImgURL: string;
	companyURL: string;
};

export type SortBy = "relevant" | "recent";
export type Direction = "next" | "prev";
