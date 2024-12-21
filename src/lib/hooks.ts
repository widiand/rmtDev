import { useEffect, useState } from "react";
import { jobItem, jobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type JobItemApiResponse = {
	public: boolean;
	jobItem: jobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
	const response = await fetch(`${BASE_API_URL}/${id}`);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}
	const data = await response.json();
	return data;
};

export const useJobItem = (id: number | null) => {
	const { data, isInitialLoading } = useQuery(
		["job-item", id],
		() => (id ? fetchJobItem(id) : null),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);

	return {
		jobItem: data?.jobItem,
		isLoading: isInitialLoading,
	} as const;
};

// export const useJobItems = (searchText: string) => {
// 	const [jobItems, setJobItems] = useState<jobItem[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);

// 	useEffect(() => {
// 		if (!searchText) return;

// 		const fetchData = async () => {
// 			setIsLoading(true);
// 			const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
// 			const data = await response.json();
// 			setIsLoading(false);
// 			setJobItems(data.jobItems);
// 		};

// 		fetchData();
// 	}, [searchText]);

// 	return { jobItems, isLoading } as const;
// };

type JobItemsApiResponse = {
	public: boolean;
	sorted: boolean;
	jobItems: jobItem[];
};

const fetchJobItems = async (
	searchText: string
): Promise<JobItemsApiResponse> => {
	const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}
	const data = await response.json();
	return data;
};

export const useJobItems = (searchText: string) => {
	const { data, isInitialLoading } = useQuery(
		["job-items", searchText],
		() => fetchJobItems(searchText),
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: (error) => {
				toast.error(error.message);
			},
		}
	);

	return {
		jobItems: data?.jobItems,
		isLoading: isInitialLoading,
	} as const;
};

export const useDebounced = <T>(value: T, delay = 250): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

export const useActiveId = () => {
	const [activeId, setActiveId] = useState<number | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setActiveId(id);
		};

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	return activeId;
};
