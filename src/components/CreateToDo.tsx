import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ToDoForm = styled.form`
    margin-bottom: 50px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
`;

const ToDoInput = styled.input`
    flex: 1;
    margin-right: 10px;
    padding: 18px;
    font-size: 18px;
    border-radius: 8px;

    ::placeholder {
        font-size: 18px;
    }
`;

const SubmitBtn = styled.button`
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    border-radius: 8px;
`;

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category },
            ...oldToDos
        ]);
        setValue("toDo", "");
    };
    return (
        <ToDoForm onSubmit={handleSubmit(handleValid)}>
            <FormRow>
                <ToDoInput
                    {...register("toDo", {
                        required: "이 항목은 반드시 입력되어야 합니다."
                    })}
                    placeholder="할 일을 입력해주세요..."
                />
                <SubmitBtn>
                    <FontAwesomeIcon icon={faPlus} />
                </SubmitBtn>
            </FormRow>
            <p>{errors?.toDo?.message}</p>
        </ToDoForm>
    );
}

export default CreateToDo;
