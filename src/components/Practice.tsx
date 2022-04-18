import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    max-width: 720px;
    margin: auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
`;

const Input = styled.input`
    margin-bottom: 10px;
`;

// input값들 type 지정
interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    verifyPassword: string;
    extraError?: string;
}

function Practice() {
    // const [toDo, setToDo] = useState("");

    // const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     const {
    //         currentTarget: { value }
    //     } = e;
    //     setToDo(value);
    // };

    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(toDo);
    //     setToDo("");
    // };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });

    const history = useHistory();

    const onValid = (data: IForm) => {
        if (data.password !== data.verifyPassword) {
            setError(
                "verifyPassword",
                {
                    message: "패스워드가 일치하지 않습니다."
                },
                {
                    shouldFocus: true
                }
            );
        } else {
            if (
                window.confirm(
                    `이메일: ${data.email}\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}\nUsername: ${data.username}\n이 정보가 확실한가요?`
                )
            ) {
                history.push("/");
            }
        }
    };

    // setError("위치", 에러메세지)

    console.log(errors);

    return (
        <Container>
            {/* <form onSubmit={onSubmit}>
                <input
                    value={toDo}
                    onChange={onChange}
                    placeholder="할 일을 입력하세요."
                />
                <button>추가</button>
            </form> */}
            <Form onSubmit={handleSubmit(onValid)}>
                <Input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            // 정규식으로 value값 지정
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed"
                        }
                    })}
                    placeholder="Email"
                />
                {/* 에러 메세지 출력 */}
                <span>{errors?.email?.message}</span>
                <Input
                    {...register("firstName", {
                        required: "Write here",
                        validate: {
                            noNoci: (value) =>
                                value.includes("nicos")
                                    ? "no nicos allowed"
                                    : true,
                            noNick: (value) =>
                                value.includes("nick")
                                    ? "no nick allowed"
                                    : true
                        }
                    })}
                    placeholder="First Name"
                />
                <span>{errors?.firstName?.message}</span>
                <Input
                    {...register("lastName", { required: "Write here" })}
                    placeholder="Last Name"
                />
                <span>{errors?.lastName?.message}</span>
                <Input
                    {...register("username", {
                        required: "Write here",
                        minLength: {
                            value: 6,
                            message: "username is too short"
                        }
                    })}
                    placeholder="Username"
                />
                <span>{errors?.username?.message}</span>
                <Input
                    {...register("password", {
                        required: "Password is required",
                        // 최소 길이 지정
                        minLength: {
                            value: 5,
                            message: "Password is too short"
                        }
                    })}
                    placeholder="Password"
                />
                <span>{errors?.password?.message}</span>
                <Input
                    {...register("verifyPassword", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Verify Password is too short"
                        }
                    })}
                    placeholder="Verify Password"
                />
                <span>{errors?.verifyPassword?.message}</span>
                <button>Submit</button>
                <span>{errors?.extraError?.message}</span>
            </Form>
        </Container>
    );
}

export default Practice;
