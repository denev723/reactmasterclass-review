import { faL, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { trelloState } from "../atoms";

const Title = styled.h3<IActive>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    p {
        margin-right: 10px;
        font-weight: bold;
        font-size: 24px;
        display: ${(props) => (props.isActive ? "none" : "block")};
    }

    form {
        display: ${(props) => (props.isActive ? "block" : "none")};
    }
`;

const BtnWrapper = styled.div<ITitle>`
    flex: 1;
    display: ${(props) => (props.isShow ? "flex" : "none")};
    justify-content: space-between;
    align-items: center;
`;

const Btn = styled.button`
    border: none;
    cursor: pointer;
`;

interface ITitle {
    isShow: boolean;
}

interface IActive {
    isActive: boolean;
}

interface IBoardTitleProps {
    boardId: string;
    index: number;
}

interface IForm {
    newId: string;
}

function BoardTitle({ boardId, index }: IBoardTitleProps) {
    const [isShow, setIsShow] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const { setValue, handleSubmit, register } = useForm<IForm>();
    const setToDos = useSetRecoilState(trelloState);

    const onDelete = () => {
        setToDos((allBoards) => {
            const copyAll = { ...allBoards };
            delete copyAll[boardId];
            return {
                ...copyAll
            };
        });
    };

    const toggleActive = () => {
        setIsActive((current) => !current);
    };

    const onValid = ({ newId }: IForm) => {};

    return (
        <Title
            isActive={isActive}
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}>
            <p>{boardId}</p>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    type={"text"}
                    placeholder={boardId}
                    {...register("newId")}
                />
            </form>
            <BtnWrapper isShow={isShow}>
                <Btn onClick={toggleActive}>
                    <FontAwesomeIcon icon={faPen} />
                </Btn>
                <Btn onClick={onDelete}>
                    <FontAwesomeIcon icon={faXmark} />
                </Btn>
            </BtnWrapper>
        </Title>
    );
}

export default BoardTitle;
