'use client'

import React, { memo } from "react";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { Text } from '@/app/board/[boardId]/_components/text'
import { Rectangle } from "@/app/board/[boardId]/_components/rectangle";
import { Ellipse } from "@/app/board/[boardId]/_components/ellipse";
import { Note } from "@/app/board/[boardId]/_components/note";
import { colorToCss } from "@/lib/utils";
import { Path } from './path'

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
        case LayerType.Path:
            return (
                <Path
                    key={ id }
                    points={ layer.points }
                    onPointerDown={ (e) => onLayerPointerDown(e, id) }
                    x={ layer.x }
                    y={ layer.y }
                    fill={ layer.fill ? colorToCss(layer.fill) : "#000" }
                    stroke={ selectionColor }
                />
            )
        case LayerType.Note:
            return (
                <Note
                    id={ id }
                    layer={ layer }
                    onPointerDown={ onLayerPointerDown }
                    selectionColor={ selectionColor }
                />
            )
        case LayerType.Text:
            return (
                <Text
                    id={ id }
                    layer={ layer }
                    onPointerDown={ onLayerPointerDown }
                    selectionColor={ selectionColor }
                />
            )
        case LayerType.Ellipse:
            return (
                <Ellipse
                    id={ id }
                    layer={ layer }
                    onPointerDown={ onLayerPointerDown }
                    selectionColor={ selectionColor }
                />
            )
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
