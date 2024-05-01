'use client'

import React from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent
} from '@/components/ui/dropdown-menu'
import { Link2, Pencil, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modals";

interface ActionsProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
    id: string
    title: string
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {

    const { onOpen } = useRenameModal()

    const { mutate, pending } = useApiMutation(api.board.remove)

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${ window.location.origin }/board/${ id }`
        )
                 .then(() => toast.success('Link copied successfully'))
                 .catch(() => toast.error('Failed to copy link'))
    }

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success('Board deleted successfully'))
            .catch(() => toast.error('Failed to delete board'))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                { children }
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                side={ side }
                sideOffset={ sideOffset }
                onClick={ (e) => e.stopPropagation() }
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={ onCopyLink }
                >
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={ () => onOpen(id, title) }
                >
                    <Pencil className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    onConfirm={ onDelete }
                    disabled={ pending }
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                >
                    <Button
                        variant="ghost"
                        className="
                            p-3
                            cursor-pointer
                            text-sm w-full
                            justify-start
                            font-normal
                        "
                    >
                        <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
