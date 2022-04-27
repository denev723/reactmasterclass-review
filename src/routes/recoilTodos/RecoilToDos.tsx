import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector, toDoState } from "../../atoms";
import CreateToDo from "../../components/CreateToDo";
import ToDo from "../../components/ToDo";

const Container = styled.div`
    max-width: 720px;
    margin: auto;
`;

const Title = styled.h2`
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    margin-top: 80px;
    margin-bottom: 50px;
`;

const SubTitle = styled.h3`
    font-size: 24px;
    margin-bottom: 15px;
    text-align: center;
`;

const List = styled.ul`
    width: 100%;
`;

const FlexWrapper = styled.div`
    display: flex;
    margin-bottom: 50px;

    ul {
        width: 50%;
        &:first-child {
            margin-right: 10px;
        }
    }
`;

function RecoilToDos() {
    const [toDos, doing, done] = useRecoilValue(toDoSelector);
    return (
        <>
            <Helmet>
                <title>Recoil To Dos</title>
            </Helmet>
            <Container>
                <Title>Recoil To Do List</Title>
                <CreateToDo />
                <FlexWrapper>
                    <List>
                        <SubTitle>
                            {toDos.length > 0 ? "해야할 일" : null}
                        </SubTitle>
                        {toDos.map((toDo) => (
                            <ToDo key={toDo.id} {...toDo} />
                        ))}
                    </List>
                    <List>
                        <SubTitle>
                            {doing.length > 0 ? "진행중" : null}
                        </SubTitle>
                        {doing.map((toDo) => (
                            <ToDo key={toDo.id} {...toDo} />
                        ))}
                    </List>
                </FlexWrapper>
                <List>
                    <SubTitle>{done.length > 0 ? "완료" : null}</SubTitle>
                    {done.map((toDo) => (
                        <ToDo key={toDo.id} {...toDo} />
                    ))}
                </List>
            </Container>
        </>
    );
}

export default RecoilToDos;
