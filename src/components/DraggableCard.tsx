import { faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITrelloTodo, trelloState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.isDragging ? "#e4f2ff" : "#fff")};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05) " : "none"};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftWrap = styled.div``;

const CardTitle = styled.p<IActive>`
    display: ${(props) => (props.isActive ? "none" : "block")};
`;

const ModiForm = styled.form<IActive>`
    display: ${(props) => (props.isActive ? "block" : "none")};
`;

const RightWrap = styled.div``;

const Btn = styled.button`
    cursor: pointer;
    border: none;
`;

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

interface IActive {
    isActive: boolean;
}

interface IForm {
    toDoText: string;
}

function DraggableCard({
    toDoId,
    toDoText,
    index,
    boardId
}: IDraggableCardProps) {
    const [isActive, setIsActive] = useState(false);
    const { handleSubmit, register, setValue } = useForm<IForm>();
    const setToDos = useSetRecoilState(trelloState);

    const modiClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive((current) => !current);
    };

    const onValid = ({ toDoText }: IForm) => {
        setToDos((allBoards) => {
            const copyBoard = [...allBoards[boardId]];
            const targetId = Object.values(copyBoard)[index].id;

            copyBoard.splice(index, 1);
            const newItem: ITrelloTodo = { id: targetId, text: toDoText };
            copyBoard.splice(index, 0, newItem);

            return { ...allBoards, [boardId]: copyBoard };
        });
        setIsActive(false);
        setValue("toDoText", "");
    };

    const onDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setToDos((allBoards) => {
                const copyBoard = [...allBoards[boardId]];
                copyBoard.splice(index, 1);

                return { ...allBoards, [boardId]: copyBoard };
            });
        }
    };
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}>
                    <LeftWrap>
                        <CardTitle isActive={isActive}>{toDoText}</CardTitle>
                        <ModiForm
                            isActive={isActive}
                            onSubmit={handleSubmit(onValid)}>
                            <input
                                type={"text"}
                                {...register("toDoText", { required: true })}
                                placeholder={toDoText}
                            />
                        </ModiForm>
                    </LeftWrap>
                    <RightWrap>
                        <Btn onClick={modiClick}>
                            <FontAwesomeIcon
                                icon={isActive ? faXmark : faPen}
                            />
                        </Btn>
                        <Btn onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Btn>
                    </RightWrap>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DraggableCard);
