'use client'


import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { useSelf } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPointer } from "@/app/board/[boardId]/_components/color-pointer";
import { useMutation } from "@/liveblocks.config";

interface SelectionToolsProps {
    camera: Camera
    setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({
    camera,
    setLastUsedColor
}: SelectionToolsProps) => {

    const selection = useSelf((me) => me.presence.selection)

    const setFill = useMutation(({
        storage
    }, fill: Color) => {

        const liveLayers = storage.get('layers')
        setLastUsedColor(fill)

        selection.forEach((id) => {
            liveLayers.get(id)?.set('fill', fill)
        })

    }, [ selection, setLastUsedColor ])

    const selectionBounds = useSelectionBounds()

    if (!selectionBounds) return null

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y


    return (
        <div
            className="
                absolute
                p-2.5
                rounded-xl
                bg-white
                shadow-sm
                border
                flex
                select-none
            "
            style={ {
                transform: `translate(calc(${ x }px - 50%), calc(${ y }px - 100%))`
            } }
        >
            <ColorPointer
                onChange={ setFill }
            />
        </div>
    )
})

SelectionTools.displayName = 'SelectionTools'
