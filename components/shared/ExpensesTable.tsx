"use client"
 
import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Expense, ExpenseTableProps } from "@/app/types"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"


export const isWithinRange = (row:any, columnId:any, value:any) => {
  const date = new Date(row.getValue(columnId));  
  const [start, end] = value;                 // value => two date input values
  //If one filter defined and date is null filter it
  if((start || end) && !date) return false;
  if(start && !end){
  return date >= start
  }else if(!start && end){
  return date <= end
  }else if (start && end) {
  return date >= start && date <= end
  } else return true;
};

export const columns: ColumnDef<Expense>[] = [

    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
   
      {
        accessorKey: "date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Date
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const date = row.getValue("date")
     
          // Format the date
          const formatted = format(date as string, "PPP")
     
          return <div className="text-right font-medium">{formatted}</div>
        },
        filterFn: isWithinRange,                                     // add filter function as a name

      },
      {
        accessorKey: "category",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Category
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("category")}</div>,
      },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
   
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
   
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Description
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
      },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const expense = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-dark-4">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              >
                <Link href={`expenses/${expense._id}`}>Expense Details</Link> 
              </DropdownMenuItem>
              <DropdownMenuItem
              >
                <Link href={`expenses/edit/${expense._id}`}>Edit Expense</Link> 
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href={`expenses/delete/${expense._id}`}>Delete Expense</Link> 

              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
   
  export function ExpenseTable({data,categories}:ExpenseTableProps) {
    const [startDate, setStartDate] = React.useState<Date>()
    const [endDate, setEndDate] = React.useState<Date>()
    React.useEffect(() => {
    table.getColumn("date")?.setFilterValue([startDate,endDate])
    }, [startDate,endDate])
    
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
   
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
      },
    })
   
    return (
      <div className="w-full">
        <div className="flex items-center gap-1 py-4">
          <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm shad-input w-1/3"
          />
          <Input
            placeholder="Filter category..."
            value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("category")?.setFilterValue(event.target.value)
            }
            className="max-w-sm shad-input w-1/3"
          />
          <Input
            placeholder="Filter amount..."
            value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("amount")?.setFilterValue(event.target.value)
            }
            className="max-w-sm shad-input w-1/3" 
          />
          
        </div>
        <div className="flex-between gap-1 py-4">
        <div className="flex items-center gap-1">

        <Label className="max-w-sm" >From Date</Label>
        <Popover >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-dark-4" align="start">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={setStartDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
    <div className="flex items-center gap-1 py-4">

                  <Label>To Date</Label>

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !endDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-dark-4" align="start">
        <Calendar
          mode="single"
          selected={endDate}
          onSelect={setEndDate}
          initialFocus
        />
      </PopoverContent>

    </Popover>
    
        </div>
        </div>
        
        <div className="rounded-md border">
          <Table >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {`Total Expenses ${table.getRowCount()}`}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }