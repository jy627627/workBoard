import { Canvas } from "@/app/board/[boardId]/_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "@/app/board/[boardId]/_components/loading";


interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({
    params
}: BoardIdPageProps) => {

    // todo

    return (
        <Room
            roomId={ params.boardId }
            fallback={ <Loading/> }
        >
            <Canvas
                boardId={ params.boardId }
            />
        </Room>
    )
}

export default BoardIdPage
