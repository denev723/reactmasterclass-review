import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";

const Container = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 0;
    left: ${(props) => (props.isActive ? "0" : "-300px")};
    width: 300px;
    height: 100vh;
    background-color: #fff;
    border-right: 1px solid #222;
    background-color: #444444;
`;

const List = styled.ul`
    margin-top: 110px;
    padding: 0 10px;
`;

const Item = styled.li`
    padding: 10px 0;
    font-size: 16px;
    color: #fff;

    p {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
    }

    a {
        text-decoration: none;
        color: #fff;
        display: block;
        width: 100%;
        height: 100%;

        &:active,
        &:focus {
            color: #fff;
        }
    }

    :first-child {
        margin-bottom: 20px;
    }

    :not(:first-child) {
        margin-bottom: 10px;
    }

    :not(:first-child):hover {
        background-color: #fbfbfb;
        color: #222;

        a {
            color: #222;
        }
    }
`;

function SideBar() {
    const isActive = useRecoilValue(isActiveAtom);
    return (
        <Container isActive={isActive}>
            <List>
                <Item>
                    <p>- Menu -</p>
                </Item>
                <Item>
                    <Link to={"/coin"}>Coin Tracker</Link>
                </Item>
                <Item>Trello Clone</Item>
            </List>
        </Container>
    );
}

export default SideBar;
