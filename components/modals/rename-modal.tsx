'use client'

import { FormEventHandler, useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle
} from '@/components/ui/dialog'
import { useRenameModal } from "@/store/use-rename-modals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


export const RenameModal = () => {

    const { mutate, pending } = useApiMutation(api.board.update)

    const {
        isOpen,
        initialValues,
        onClose
    } = useRenameModal()

    const [ title, setTitle ] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [ initialValues.title ]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        mutate({
            id: initialValues.id,
            title
        })
            .then(() => {
                toast.success('Board Renamed Successfully')
                onClose()
            })
            .catch(() => toast.error('Failed to rename board'))
    }

    return (
        <Dialog open={ isOpen } onOpenChange={ onClose }>
            <DialogContent>
                <DialogHeader>
                    <DialogHeader>
                        <DialogTitle>
                            Edit board title
                        </DialogTitle>
                    </DialogHeader>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form
                    className="space-y-4"
                    onSubmit={ (e) => onSubmit(e) }
                >
                    <Input
                        required
                        placeholder="Board Title"
                        disabled={ pending }
                        maxLength={ 60 }
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={ pending }>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
