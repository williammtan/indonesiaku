import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { indexMultiple } from "@/lib/utils"

import { DataTablePagination } from "./data-table-pagination"

interface Column<T> {
  accessorKey: keyof T
  header: string
  cell?: (value: any) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageCount: number
  currentPage: number
  pageSize: number
  totalItems: number
}

export function DataTable<T>({
  columns,
  data,
  pageCount,
  currentPage,
  pageSize,
  totalItems,
}: DataTableProps<T>) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.accessorKey)}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((column) => (
                    <TableCell key={String(column.accessorKey)}>
                      {column.cell 
                        ? column.cell(indexMultiple(row, column.accessorKey))
                        : indexMultiple(row, column.accessorKey) as React.ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Table>
      </div>
      <DataTablePagination 
        pageCount={pageCount}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  )
}
