import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faHouseChimneyWindow
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const HeaderEl = styled.header`
    text-align: center;
    position: relative;
    padding: 30px 10px;
    border-bottom: 1px solid #222;

    h1 {
        margin: 0;
        font-size: 48px;
    }
`;

const BtnWrapper = styled.div`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const SmBtn = styled.button`
    background-color: transparent;
    border: 1px solid #222;
    border-radius: 8px;
    width: 39px;
    height: 39px;
    cursor: pointer;

    :not(:last-child) {
        margin-right: 5px;
    }
`;

const GnbWrapper = styled.ul`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const GnbItem = styled.li``;

function Header() {
    const [isActive, setIsActive] = useRecoilState(isActiveAtom);
    const history = useHistory();

    const toggleSideBar = () => {
        setIsActive((current) => !current);
    };
    const goHome = () => {
        history.push("/");
    };

    return (
        <HeaderEl>
            <BtnWrapper>
                <SmBtn onClick={toggleSideBar}>
                    <FontAwesomeIcon icon={faBars} />
                </SmBtn>
                <SmBtn onClick={goHome}>
                    <FontAwesomeIcon icon={faHouseChimneyWindow} />
                </SmBtn>
            </BtnWrapper>
            <h1>React Master Class</h1>
            <GnbWrapper>
                <GnbItem>
                    <a
                        href="https://api.coinpaprika.com/"
                        target="_blank"
                        rel="noreferrer">
                        Coinpaprika
                    </a>
                </GnbItem>
            </GnbWrapper>
        </HeaderEl>
    );
}

export default Header;
