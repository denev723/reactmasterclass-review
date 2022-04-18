import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../atoms";
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

const List = styled.ul``;

function RecoilToDos() {
    const toDos = useRecoilValue(toDoState);
    console.log(toDos);
    return (
        <Container>
            <Title>Recoil To Do List</Title>
            <CreateToDo />
            <List>
                {toDos.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo} />
                ))}
            </List>
        </Container>
    );
}

export default RecoilToDos;
