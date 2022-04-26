import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { trelloState } from "../atoms";

const Container = styled.div`
    margin: 0 100px 50px;

    input {
        width: 40%;
        border-radius: 10px;
        font-size: 18px;
        padding: 20px 10px;

        &::placeholder {
            font-size: 18px;
        }
    }
`;

interface IForm {
    text: string;
}

function CreateBoard() {
    const setToDos = useSetRecoilState(trelloState);
    const { register, setValue, handleSubmit } = useForm<IForm>();

    const onValid = ({ text }: IForm) => {
        console.log(text);
        setToDos((boards) => {
            return {
                ...boards,
                [text]: []
            };
        });
        setValue("text", "");
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("text", { required: true })}
                    type={"text"}
                    placeholder="생성할 보드 이름을 입력하세요"
                />
            </form>
        </Container>
    );
}

export default CreateBoard;
