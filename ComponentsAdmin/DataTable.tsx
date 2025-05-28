"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export interface Column<T> {
  label: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "right";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowsPerPage?: number;
  searchableFields?: (keyof T)[];
  statusField?: keyof T;
  statusOptions?: string[];
  sortableFields?: (keyof T)[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  text: string;
}

const DataTable = <T,>({
  data,
  columns,
  rowsPerPage = 10,
  searchableFields = [],
  statusField,
  statusOptions = [],
  sortableFields = [],
  onEdit,
  onDelete,
  text,
}: DataTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = data.filter((item) => {
    const matchesSearch =
      searchableFields.length === 0
        ? true
        : searchableFields.some((field) =>
            String(item[field]).toLowerCase().includes(search.toLowerCase()),
          );

    const matchesStatus =
      !statusField || statusFilter === "" || statusFilter === "ALL"
        ? true
        : item[statusField] === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const compare = String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
        });
        return sortOrder === "asc" ? compare : -compare;
      })
    : filtered;

  const paginated = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const maxPage = Math.ceil(sorted.length / rowsPerPage);

  return (
    <div className="mb-4 rounded-xl border bg-white shadow-md">
      <div className="flex flex-wrap items-center gap-4 p-4">
        {searchableFields.length > 0 && (
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setPage(0);
              setSearch(e.target.value);
            }}
            className="w-60"
          />
        )}
        {statusField && (
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setPage(0);
              setStatusFilter(value);
            }}
          >
            <SelectTrigger className="w-48">
              {statusFilter === "" ? "All statuses" : statusFilter}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {sortableFields.length > 0 && (
          <Select
            value={sortKey as string}
            onValueChange={(val) => {
              setPage(0);
              setSortKey(val as keyof T);
            }}
          >
            <SelectTrigger className="w-48">
              {sortKey ? `Sort by ${String(sortKey)}` : "Sort by..."}
            </SelectTrigger>
            <SelectContent>
              {sortableFields.map((field) => (
                <SelectItem key={String(field)} value={String(field)}>
                  {String(field)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {columns.map((col) => (
              <TableHead
                key={String(col.accessor)}
                className={`text-sm text-gray-600 uppercase ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.label}
              </TableHead>
            ))}
            <TableHead className="text-right text-sm text-gray-600 uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.map((item, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell
                  key={String(col.accessor)}
                  className={`${
                    col.align === "right" ? "text-right" : "text-left"
                  } max-w-xs truncate`}
                  title={String(item[col.accessor])}
                >
                  {col.render ? col.render(item) : String(item[col.accessor])}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(item)}>
                      {text}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(item)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between p-4">
        <span className="text-sm text-gray-500">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, sorted.length)} of {sorted.length}{" "}
          results
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, maxPage - 1))}
            disabled={page >= maxPage - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
