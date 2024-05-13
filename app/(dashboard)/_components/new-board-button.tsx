'use client'

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const NewBoardButton = ({
    orgId,
    disabled
}: NewBoardButtonProps) => {

    const router = useRouter()

    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
            .then((id) => {
                toast.success('Board created')
            })
            .catch(() => {
                toast.error('Failed to create board')
            })
    }

    return (
        <button
            disabled={ pending || disabled }
            onClick={ onClick }
            className={ cn(
                `col-span-1 aspect-[100/127] bg-yellow-400 rounded-lg hover:bg-yellow-800 flex flex-col items-center justify-center`,
                (pending || disabled) && `opacity-75 hover:bg-blue-600 cursor-not-allowed`
            ) }
        >
            <div/>
            <Plus
                className="
                    h-12
                    w-12
                    text-white
                    stroke-1
                "
            />
            <p
                className="
                    text-xs
                    text-white
                    font-light
                "
            >
                New board
            </p>
        </button>
    )
}

