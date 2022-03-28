import { useRecoilState } from "recoil";
import { isActiveAtom } from "../atoms";

function Header() {
    const [isActive, setIsActive] = useRecoilState(isActiveAtom);
    const onClick = () => {
        setIsActive((current) => !current);
    };
    return (
        <header>
            <div>
                <button onClick={onClick}>Menu</button>
            </div>
            <h1>React Master Class</h1>
        </header>
    );
}

export default Header;
