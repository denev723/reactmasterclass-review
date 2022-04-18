import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ToDoForm = styled.form`
    margin-bottom: 50px;
`;

const FormRow = styled.div`
    display: flex;
    align-items: center;
`;

const ToDoInput = styled.input`
    flex: 1;
    margin-right: 10px;
    height: 56px;
    padding: 0;
    font-size: 18px;
    border-radius: 8px;

    ::placeholder {
        font-size: 18px;
    }
`;

const SubmitBtn = styled.button`
    width: 60px;
    height: 60px;
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
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IForm>();
    const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
            { text: toDo, id: Date.now(), category: "TO_DO" },
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
                {errors?.toDo?.message}
                <SubmitBtn>
                    <FontAwesomeIcon icon={faPlus} />
                </SubmitBtn>
            </FormRow>
        </ToDoForm>
    );
}

export default CreateToDo;
