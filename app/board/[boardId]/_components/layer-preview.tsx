'use client'

import React, { memo } from "react";
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "@/app/board/[boardId]/_components/rectangle";

interface LayerPreview {
    id: string
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

export const LayerPreview = memo((({
    id,
    onLayerPointerDown,
    selectionColor,
}: LayerPreview) => {

    const layer = useStorage((root) => root.layers.get(id))

    if (!layer) return null

    switch (layer.type) {
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={ id }
                    layer={ layer }
                    onPointerDown={ onLayerPointerDown }
                    selectionColor={ selectionColor }
                />
            )
        default:
            return null
    }

}))

LayerPreview.displayName = 'LayerPreview'
