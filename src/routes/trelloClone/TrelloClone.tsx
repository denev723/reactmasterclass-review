import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { trelloState } from "../../atoms";
import Boards from "../../components/Boards";
import CreateBoard from "../../components/CreateBoard";

const Container = styled.div`
    padding: 0 100px;
    min-height: 100vh;
    background-color: #2c3e50;
`;

const Title = styled.h2`
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    padding-top: 80px;
    padding-bottom: 50px;
    color: #fff;
`;

function TrelloClone() {
    const setToDos = useSetRecoilState(trelloState);
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;

        if (destination.droppableId === "Boards") {
            setToDos((boards) => {
                const allBoards = Object.keys(boards);
                const taskBoard = allBoards[source.index];

                allBoards.splice(source.index, 1);
                allBoards.splice(destination.index, 0, taskBoard);

                let newBoards = {};
                allBoards.map((board) => {
                    return (newBoards = {
                        ...newBoards,
                        [board]: boards[board]
                    });
                });
                return { ...newBoards };
            });
        } else if (destination.droppableId === source.droppableId) {
            setToDos((boards) => {
                const copyBoard = [...boards[source.droppableId]];
                const targetItem = copyBoard[source.index];
                copyBoard.splice(source.index, 1);
                copyBoard.splice(destination?.index, 0, targetItem);

                return { ...boards, [source.droppableId]: copyBoard };
            });
        } else if (destination.droppableId !== source.droppableId) {
            setToDos((boards) => {
                const sourceCopy = [...boards[source.droppableId]];
                const destCopy = [...boards[destination.droppableId]];
                const targetItem = sourceCopy[source.index];

                sourceCopy.splice(source.index, 1);
                destCopy.splice(destination.index, 0, targetItem);

                return {
                    ...boards,
                    [source.droppableId]: sourceCopy,
                    [destination.droppableId]: destCopy
                };
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Trello Clone</title>
            </Helmet>
            <Container>
                <Title>Trello Clone</Title>
                <CreateBoard />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Boards />
                </DragDropContext>
            </Container>
        </>
    );
}

export default TrelloClone;
