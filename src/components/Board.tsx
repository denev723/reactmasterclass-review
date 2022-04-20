import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "../components/DraggableCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: #dadfe9;
    border-radius: 5px;
    min-height: 200px;
`;

const Title = styled.h3`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface IBoard {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoard) {
    console.log(boardId);
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    <Title>{boardId}</Title>
                    {toDos.map((toDo, index) => (
                        <DraggableCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;
