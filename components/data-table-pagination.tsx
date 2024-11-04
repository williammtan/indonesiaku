import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface DataTablePaginationProps {
	pageCount: number;
	currentPage: number;
	totalItems: number;
	pageSize: number;
}

export function DataTablePagination({
	pageCount,
	currentPage,
	totalItems,
	pageSize,
}: DataTablePaginationProps) {
	const start = (currentPage - 1) * pageSize + 1;
	const end = Math.min(currentPage * pageSize, totalItems);

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				Showing {start} to {end} of {totalItems} entries
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">20 rows per page</p>
					{/* <Select
						value={`${pageSize}`}
						onValueChange={(value) => {
							router.push(`?page=1&pageSize=${value}`);
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select> */}
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {currentPage} of {pageCount}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						asChild
						disabled={currentPage <= 1}
					>
						<Link href={`?page=1&pageSize=${pageSize}`}>
							<span className="sr-only">Go to first page</span>
							<DoubleArrowLeftIcon className="h-4 w-4" />
						</Link>
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						asChild
						disabled={currentPage <= 1}
					>
						<Link
							href={`?page=${
								currentPage - 1
							}&pageSize=${pageSize}`}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeftIcon className="h-4 w-4" />
						</Link>
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						asChild
						disabled={currentPage >= pageCount}
					>
						<Link
							href={`?page=${
								currentPage + 1
							}&pageSize=${pageSize}`}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRightIcon className="h-4 w-4" />
						</Link>
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						asChild
						disabled={currentPage >= pageCount}
					>
						<Link href={`?page=${pageCount}&pageSize=${pageSize}`}>
							<span className="sr-only">Go to last page</span>
							<DoubleArrowRightIcon className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
