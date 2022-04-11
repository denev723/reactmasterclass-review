import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isActiveAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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

const Btn = styled.button`
    background-color: transparent;
    border: 1px solid #222;
    border-radius: 8px;
    width: 39px;
    height: 39px;
`;

function Header() {
    const [isActive, setIsActive] = useRecoilState(isActiveAtom);
    const onClick = () => {
        setIsActive((current) => !current);
    };
    return (
        <HeaderEl>
            <BtnWrapper>
                <Btn onClick={onClick}>
                    <FontAwesomeIcon icon={faBars} />
                </Btn>
            </BtnWrapper>
            <h1>React Master Class</h1>
        </HeaderEl>
    );
}

export default Header;
