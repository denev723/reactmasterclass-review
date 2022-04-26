import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { trelloState } from "../atoms";
import Board from "./Board";

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: visible;
    margin: 0 100px;
    padding-top: 70px;
    position: relative;
`;

function Boards() {
    const toDos = useRecoilValue(trelloState);

    return (
        <Droppable droppableId="Boards" type="BOARD" direction="horizontal">
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.droppableProps}>
                    {Object.keys(toDos).map((boardId, index) => (
                        <Board
                            index={index}
                            boardId={boardId}
                            toDos={toDos[boardId]}
                            key={boardId}
                        />
                    ))}
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
    );
}

export default Boards;
