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
    border-right: 1px solid ${(props) => props.theme.lineColor};
    display: flex;
    justify-content: center;
    z-index: 9;
`;

const Menu = styled.ul`
    width: 100%;
    overflow-x: hidden;

    h2 {
        height: 108px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: ${(props) => props.theme.headerFontColor};
        background-color: ${(props) => props.theme.headerBg};
        margin-bottom: 20px;
        border-bottom: 1px solid #222;
    }
`;

const MenuItem = styled.li`
    a {
        display: block;
        padding: 20px;
        width: 100%;
        height: 100%;
        background-color: #534bae;
        color: #fff;
        text-decoration: none;
        border-top: 1px solid #222;
        border-bottom: 1px solid #222;

        &:hover {
            background-color: #000051;
        }
    }

    :not(:last-child) {
        margin-bottom: 5px;
    }
`;

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
