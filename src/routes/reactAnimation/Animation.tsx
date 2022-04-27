import { Helmet } from "react-helmet";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #e09, #d0e);
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 30px;
`;

const NewBox = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0.06);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
    background-color: #fff;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0.06);
`;

const myVars = {
    start: {
        scale: 0
    },
    end: {
        scale: 1,
        rotateZ: 360,
        transition: { type: "spring", bounce: 0.5, delay: 0.5 }
    }
};

const boxVars = {
    start: {
        opacity: 0,
        scale: 0.5
    },
    end: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            duration: 0.5,
            bounce: 0.5,
            // 자식 요소에 관여할 수 있음
            delayChildren: 0.5,
            staggerChildren: 0.2
        }
    }
};

const circleVars = {
    start: {
        opacity: 0,
        y: 10
    },
    end: {
        opacity: 1,
        y: 0
    }
};

function Animation() {
    return (
        <>
            <Helmet>
                <title>React Animation</title>
            </Helmet>
            <Wrapper>
                <Box
                    transition={{ type: "spring", bounce: 0.5, delay: 0.5 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotateZ: "360deg" }}
                />

                <Box variants={myVars} initial="start" animate="end" />

                <NewBox variants={boxVars} initial="start" animate="end">
                    {/* 상속 */}
                    <Circle variants={circleVars} />
                    <Circle variants={circleVars} />
                    <Circle variants={circleVars} />
                    <Circle variants={circleVars} />
                </NewBox>
                {/* 이런 형식으로 사용하면 안됨 */}
                {/* <div></div> */}
                {/* 이런식으로 사용해야함 */}
                {/* <motion.div></motion.div> */}
            </Wrapper>
        </>
    );
}

export default Animation;
