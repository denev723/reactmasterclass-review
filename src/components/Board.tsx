import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITrelloTodo, trelloState } from "../atoms";
import DraggableCard from "../components/DraggableCard";
import BoardTitle from "./BoardTitle";

const Wrapper = styled.div<IWrapperProps>`
    width: 300px;
    color: #222;
    margin-right: 30px;
    flex: 0 0 auto;
    background-color: ${(props) => (props.isMove ? "#3498db" : "#2980b9")};
    border: 1px solid ${(props) => (props.isMove ? "#fff" : "#222")};

    :last-child {
        margin-right: 0;
    }
`;

const Area = styled.div<IAreaProps>`
    min-height: 400px;
    height: auto;
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#3498db"
            : props.isDraggingFromThis
            ? "#d63031"
            : "#2980b9"};
    position: relative;
    border-radius: 8px;
`;

const Form = styled.form`
    margin-bottom: 20px;
    input {
        width: 200px;
        height: 40px;
        padding: 0 15px;
        border-radius: 8px;
        border: 1px solid #222;
    }
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

interface IWrapperProps {
    isMove: boolean;
}

interface IBoard {
    toDos: ITrelloTodo[];
    boardId: string;
    index: number;
}
interface IForm {
    toDo: string;
}

function Board({ toDos, boardId, index }: IBoard) {
    const setToDos = useSetRecoilState(trelloState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo]
            };
        });
        setValue("toDo", "");
    };

    return (
        <Draggable draggableId={boardId} index={index} key={boardId}>
            {(magic, snapshot) => (
                <Wrapper
                    isMove={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}>
                    <BoardTitle index={index} boardId={boardId} />
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", {
                                required: "Tasks is required"
                            })}
                            type="text"
                            placeholder="목록을 추가해보세요!!"
                        />
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(magic, snapshot) => (
                            <Area
                                isDraggingOver={snapshot.isDraggingOver}
                                isDraggingFromThis={Boolean(
                                    snapshot.draggingFromThisWith
                                )}
                                ref={magic.innerRef}
                                {...magic.droppableProps}>
                                {toDos.map((toDo, index) => (
                                    <DraggableCard
                                        key={toDo.id}
                                        index={index}
                                        toDoId={toDo.id}
                                        toDoText={toDo.text}
                                        boardId={boardId}
                                    />
                                ))}
                                {magic.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </Wrapper>
            )}
        </Draggable>
    );
}

export default Board;
