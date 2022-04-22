import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITrelloTodo, trelloState } from "../atoms";
import DraggableCard from "../components/DraggableCard";

const Wrapper = styled.div`
    padding: 10px 0px;
    background-color: #dadfe9;
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    padding: 20px;
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h3`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
    position: relative;

    button {
        visibility: hidden;
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        transition: visibility 0.5s ease-in-out;
    }

    &:hover {
        button {
            visibility: visible;
            transition: visibility 0.5s ease-in-out;
        }
    }
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IBoard {
    toDos: ITrelloTodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoard) {
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
        <Wrapper>
            <Title>
                {boardId}
                <button onClick={onClick}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: "Tasks is required" })}
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
    );
}

export default Board;
