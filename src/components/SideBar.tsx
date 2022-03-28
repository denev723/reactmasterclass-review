import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";

const Container = styled.div<{ isActive: boolean }>`
    position: absolute;
    top: 0;
    left: ${(props) => (props.isActive ? "0" : "-30vw")};
    width: 30vw;
    height: 100vh;
    background-color: #fff;
`;

function SideBar() {
    const isActive = useRecoilValue(isActiveAtom);
    return (
        <Container isActive={isActive}>
            <ul>
                <li>
                    <Link to={"/coin"}>Coin Tracker</Link>
                </li>
                <li>Trello Clone</li>
            </ul>
        </Container>
    );
}

export default SideBar;
