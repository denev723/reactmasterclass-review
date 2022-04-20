import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloState } from "../atoms";
import Board from "../components/Board";

const Container = styled.div`
    background-color: #3f8cf2;
`;

const Wrapper = styled.div`
    display: flex;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 10px;
`;

function TrelloClone() {
    const [toDos, setToDos] = useRecoilState(trelloState);

    // drag가 완료되었을때 로직
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { draggableId, destination, source } = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            // 보드 안에서 아이템 이동
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                // 1) Delete item on source.index
                console.log("Delete item on", source.index);
                console.log(boardCopy);
                boardCopy.splice(source.index, 1);
                console.log("Deleted item");
                console.log(boardCopy);
                // 2) Put back the item on the destination.index
                console.log("Put back", draggableId, "on", destination.index);
                boardCopy.splice(destination?.index, 0, draggableId);
                console.log(boardCopy);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            // 보드간 아이템 이동
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const destinationBoard = [
                    ...allBoards[destination.droppableId]
                ];

                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, draggableId);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard
                };
            });
        }
        /*setToDos((oldToDos) => {
        기존 toDos 복사
        const toDosCopy = [...oldToDos];
        1) Delete item on source.index
        console.log("Delete item on", source.index);
        console.log(toDosCopy);
        toDosCopy.splice(source.index, 1);
        console.log("Deleted item");
        console.log(toDosCopy);
        2) Put back the item on the destination.index
        console.log("Put back", draggableId, "on", destination.index);
        toDosCopy.splice(destination?.index, 0, draggableId);
        console.log(toDosCopy);
        return toDosCopy;
        });*/
    };
    return (
        <Container>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Boards>
                        {Object.keys(toDos).map((boardId) => (
                            <Board
                                key={boardId}
                                boardId={boardId}
                                toDos={toDos[boardId]}
                            />
                        ))}
                    </Boards>
                </Wrapper>
            </DragDropContext>
        </Container>
    );
}

export default TrelloClone;
