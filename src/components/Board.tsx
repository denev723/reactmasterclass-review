import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITrelloTodo, trelloState } from "../atoms";
import DraggableCard from "../components/DraggableCard";

const Wrapper = styled.div<IWrapperProps>`
    width: 300px;
    color: #222;
    margin-right: 30px;
    flex: 0 0 auto;
    background-color: ${(props) => (props.isMove ? "blue" : "cadetblue")};
`;

const Area = styled.div<IAreaProps>`
    min-height: 200px;
    height: auto;
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#6c5ce7"
            : props.isDraggingFromThis
            ? "#d63031"
            : "red"};
`;

const Title = styled.h3``;

const Form = styled.form``;

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

    const onClick = () => {
        setToDos((allBoards) => {
            const copyAll = { ...allBoards };
            delete copyAll[boardId];
            return {
                ...copyAll
            };
        });
    };

    return (
        <Draggable draggableId={boardId} index={index} key={boardId}>
            {(magic, snapshot) => (
                <Wrapper
                    isMove={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}>
                    <Title>
                        {boardId}
                        <button onClick={onClick}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", {
                                required: "Tasks is required"
                            })}
                            type="text"
                            placeholder={`Add task on ${boardId}`}
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
