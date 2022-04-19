import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, IToDo, toDoState } from "../atoms";

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 6px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #222;
    margin-bottom: 10px;

    div {
        :first-child {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 20px;
        }

        button {
            padding: 10px 12px;

            &:not(:last-child) {
                margin-right: 5px;
            }
        }
    }
`;

function ToDo({ text, id, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name }
        } = e;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1)
            ];
        });
    };
    const deleteToDo = (e: React.MouseEvent<HTMLButtonElement>) => {
        setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
    };
    return (
        <Item>
            <div>{text}</div>
            <div>
                {category !== Categories.DOING && (
                    <button name={Categories.DOING} onClick={onClick}>
                        진행중
                    </button>
                )}
                {category !== Categories.TO_DO && (
                    <button name={Categories.TO_DO} onClick={onClick}>
                        해야할 일
                    </button>
                )}
                {category !== Categories.DONE && (
                    <button name={Categories.DONE} onClick={onClick}>
                        완료
                    </button>
                )}
                <button onClick={deleteToDo}>삭제</button>
            </div>
        </Item>
    );
}

export default ToDo;
