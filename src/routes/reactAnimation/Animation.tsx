import { Helmet } from "react-helmet";
import styled from "styled-components";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useTransform,
    useViewportScroll
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    min-height: 200vh;
    justify-content: center;
    align-items: center;
`;

const SubWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    position: relative;
`;

const SubBox = styled(motion.div)`
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 100px;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 30px;
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NewBox = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0.06);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 30px;
    flex: 0 0 auto;
`;

const Circle = styled(motion.div)`
    background-color: #fff;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0.06);
`;

const BoxTwo = styled(motion.div)`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) 10px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 30px;
`;

const BiggerBox = styled.div`
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 100px;
    flex: 0 0 auto;
`;

const Svg = styled.svg`
    width: 300px;
    height: 300px;

    path {
        stroke: white;
        stroke-width: 2;
    }
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

const boxTwoVars = {
    hover: { scale: 1.5, rotateZ: 90 },
    click: { scale: 1, borderRadius: "50%" },
    drag: {
        backgroundColor: "rgb(46, 204, 113)",
        transition: { duration: 10 }
    }
};

const svgVars = {
    start: {
        pathLength: 0,
        fill: "rgba(255,255,255,0)"
    },
    end: {
        pathLength: 1,
        fill: "rgba(255,255,255,1)"
    }
};

const toggleVars = {
    initial: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360
    },
    leaving: {
        opacity: 0,
        y: -50
    }
};

const sliderVars = {
    entry: (back: boolean) => ({
        x: back ? -500 : 500,
        opacity: 0,
        scale: 0
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1
        }
    },
    exit: (back: boolean) => ({
        x: back ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: {
            duration: 1
        }
    })
};

function Animation() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
    const rotateZ = useTransform(x, [-800, 0, 800], [-360, 0, 360]);
    const gradient = useTransform(
        x,
        [-800, 800],
        [
            "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
            "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))"
        ]
    );
    const { scrollYProgress } = useViewportScroll();
    const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1]);

    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing((current) => !current);
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlease = () => {
        setBack(false);
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    };
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    };

    useEffect(() => {
        // x.onChange(() => console.log(x.get()));
        scale.onChange(() => console.log(scale.get()));
    }, [scale]);
    return (
        <>
            <Helmet>
                <title>React Animation</title>
            </Helmet>
            <Wrapper style={{ background: gradient }}>
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

                <BiggerBox ref={biggerBoxRef}>
                    <BoxTwo
                        // drag="x" or ="y" 드래그 축 지정 가능
                        drag
                        // 드래그가 끝나면 처음위치로 돌아옴
                        dragSnapToOrigin
                        // 탄성..?
                        dragElastic={0.5}
                        dragConstraints={biggerBoxRef}
                        variants={boxTwoVars}
                        whileHover="hover"
                        whileTap="click"
                        whileDrag="drag"
                    />
                </BiggerBox>

                <Box
                    style={{ x, rotateZ, scale: scrollScale }}
                    drag="x"
                    dragSnapToOrigin
                />
                {/* 이런 형식으로 사용하면 안됨 */}
                {/* <div></div> */}
                {/* 이런식으로 사용해야함 */}
                {/* <motion.div></motion.div> */}
                <BiggerBox>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <motion.path
                            variants={svgVars}
                            initial="start"
                            animate="end"
                            // animation 요소마다 효과 시간을 다르게 주고 싶을때
                            // variants 안에서는 모든 효과를 한번에 조절
                            transition={{
                                default: { duration: 5 },
                                fill: { duration: 1.5, delay: 2 }
                            }}
                            d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
                        />
                    </Svg>
                </BiggerBox>
            </Wrapper>
            <SubWrapper style={{ background: gradient }}>
                <button
                    onClick={toggleShowing}
                    style={{ marginBottom: "50px" }}>
                    Click
                </button>
                <AnimatePresence>
                    {showing ? (
                        <SubBox
                            variants={toggleVars}
                            initial="initial"
                            animate="visible"
                            exit="leaving"
                        />
                    ) : null}
                </AnimatePresence>
            </SubWrapper>
            <SubWrapper style={{ background: gradient, flexDirection: "row" }}>
                <AnimatePresence exitBeforeEnter>
                    <SubBox
                        custom={back}
                        variants={sliderVars}
                        initial="entry"
                        animate="center"
                        exit="exit"
                        key={visible}>
                        {visible}
                    </SubBox>
                </AnimatePresence>
                <button onClick={nextPlease}>Next</button>
                <button onClick={prevPlease}>Prev</button>
            </SubWrapper>
        </>
    );
}

export default Animation;
