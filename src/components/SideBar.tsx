import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";
import { Link } from "react-router-dom";

const Container = styled.div<{ isActive: boolean }>`
    width: 300px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: ${(props) => (props.isActive ? 0 : "-300px")};
    border-right: 1px solid #222;
    display: flex;
    justify-content: center;
`;

const Menu = styled.ul``;

const MenuItem = styled.li``;

function SideBar() {
    const isActive = useRecoilValue(isActiveAtom);
    return (
        <Container isActive={isActive}>
            <Menu>
                <h2> - MENU - </h2>
                <MenuItem>
                    <Link to={"/coin-tracker"}>Coin Tracker</Link>
                </MenuItem>
                <MenuItem>
                    <Link to={"/trello-clone"}>Trello Clone</Link>
                </MenuItem>
            </Menu>
        </Container>
    );
}

export default SideBar;
