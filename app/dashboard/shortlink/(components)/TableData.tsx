"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePathname, useRouter } from "next/navigation";
import useUrl from "@/hooks/useUrl";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import getBaseUrl from "@/lib/getBaseUrl";
import { Badge } from "@/components/ui/badge";
import { LinkDB } from "@/lib/types";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import EditForm from "./EditForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { APIReturn } from "@/lib/apiFetch";

export type LinkType = {
    id: string;
    name: string;
    link: string;
    redirect: string;
    createdAt: number;
    click: string;
} & LinkDB;

function useColumnDef(ev: (v: LinkType) => any, ev1: (v: LinkType) => any) {
    let url = useUrl();
    let protocol = url?.protocol;

    function handleEdit(link: LinkType) {
        ev(link);
    }

    function handleDelete(link: LinkType) {
        ev1(link);
    }

    const columns: ColumnDef<LinkType>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="text-white border-muted data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    className="text-white border-muted data-[state=checked]:bg-white data-[state=checked]:text-black"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => (
                <div className="capitalize flex items-center gap-4">
                    {row.original.createdAt > Date.now() - 6e4 * 60 * 12 && <Badge variant="secondary">New</Badge>} {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Created at
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div className="capitalize flex items-center gap-4">{new Date(row.getValue("createdAt")).toDateString()}</div>,
        },
        {
            accessorKey: "link",
            header: "Link",
            cell: ({ row }) => {
                return (
                    <div className="font-medium">
                        <Link className="underline max-w-[12rem] block overflow-hidden truncate" href={`/r/${row.getValue("link")}`}>
                            {row.getValue("link")}
                        </Link>
                    </div>
                );
            },
        },
        {
            accessorKey: "redirect",
            header: "Redirect",
            cell: ({ row }) => {
                return (
                    <Link href={row.getValue("redirect")} className="font-medium underline max-w-[12rem] block overflow-hidden truncate">
                        {row.getValue("redirect")}
                    </Link>
                );
            },
        },
        {
            accessorKey: "click",
            header: ({ column }) => {
                return (
                    <div className="flex">
                        <Button className="ml-auto" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                            Total visited
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("click")}</div>;
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const link = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Separator orientation="horizontal" className="w-full my-2" />

                            <DropdownMenuItem onClick={() => handleEdit(link)}>
                                <Button variant="secondary" className="w-full flex justify-start gap-2">
                                    <Pencil />
                                    Edit
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(`${protocol}//
                            ${url?.hostname}
                            ${url?.hostname == "localhost" ? ":3000" : ""}/r/
                            ${link.link}`)
                                }
                            >
                                <Button variant="secondary" className="w-full flex justify-start gap-2">
                                    <Copy />
                                    Copy Link
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => handleDelete(link)}>
                                <Button variant="destructive" className="w-full flex justify-start gap-2">
                                    <Trash />
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return columns;
}

type Props = {
    data: LinkType[];
    token: string;
};
export function TableData({ data, token }: Props) {
    let { toast } = useToast();
    let [link, setLink] = React.useState<LinkType>();
    let [editDialogOpen, setEditDialogOpen] = React.useState(false);
    let [confirmOpen, setConfirmOpen] = React.useState(false);
    let [deleteDisabled, setDeleteDisabled] = React.useState(false);
    let router = useRouter();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    let columns = useColumnDef(handleEditForm, handleDeleteShort);
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
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    function handleEditForm(link: LinkType) {
        setLink(link);
        setEditDialogOpen(true);
    }

    function handleDeleteShort(link: LinkType) {
        setLink(link);
        setConfirmOpen(true);
    }

    async function handleConfirmation() {
        try {
            setDeleteDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });
            let data = await fetch("/api/short/delete", {
                method: "POST",
                body: JSON.stringify({ id: link?.id }),
                headers: {
                    Authorization: token,
                },
            });

            let api: APIReturn<any> = await data.json();

            if (api.status != "OK") {
                toast({ title: "Failed", description: api.message });
                return;
            }

            setConfirmOpen(false);
            router.refresh();
            return toast({ title: "Delete success", description: "Process completed" });
        } catch (err) {
            console.log(err);
            toast({ title: "Unexpected server error", description: "Something went wrong!" });
        } finally {
            setDeleteDisabled(false);
        }
    }

    return (
        <div className="w-full">
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Link</DialogTitle>
                        <DialogDescription>Customize your link</DialogDescription>
                    </DialogHeader>
                    <EditForm setState={setEditDialogOpen} token={token} link={link} />
                </DialogContent>
            </Dialog>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Data deletion</DialogTitle>
                        <DialogDescription className="flex justify-between items-center">
                            <span>
                                Short <b className="text-primary">{link?.name}</b> will be deleted
                            </span>
                            <Button onClick={handleConfirmation} disabled={deleteDisabled} variant="destructive">
                                Delete
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="flex gap-2 items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <ScrollArea className="w-full whitespace-nowrap">
                    <Table className="overflow-hidden">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
