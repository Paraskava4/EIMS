import React, { useState, useRef, useEffect } from "react";
import { isValidArray } from "../../../utils/constants/validation/array";
import "./style.scss";

export function SliderTrack({ position, radius }) {
    return <circle className={"sliderTrack"} cx={position.x} cy={position.y} r={radius} strokeWidth="4" stroke="#ffffff" fill="none" />;
}

export const SingleProgress = (props) => {
    const { standardName, subject } = props?.item;

    return (
        <>
            <p className="p-0 m-0 std-name mt-2 my-2">Std {standardName}</p>
            <div className="std-progress-wrapper mt-1 d-flex align-items-center position-relative">
                <div className="d-flex border-start">
                    {isValidArray(subject) &&
                        subject?.map((item) => {
                            return (
                                <React.Fragment key={item?.subjectId}>
                                    <div className="progress-box">
                                        <div className="py-1 align-self-center">
                                            <span className="subject-and-teacher-name">{item?.subjectName || "-"}</span>
                                            <Slider percent={item?.progressCount || 0} />
                                            <span className="subject-and-teacher-name mb-2">{item?.staff || "-"}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export function Slider({ percent = 100 }) {
    const [originX] = useState(50);
    const [originY] = useState(50);
    const [radius] = useState(30);
    const [percentage] = useState(percent);
    const [angleDegrees, setAngleDegrees] = useState(0);
    const [angleRadians, setAngleRadians] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const sliderWrapper = useRef();

    useEffect(() => {
        const angleDeg = Math.round(percentage) === 100 ? 359 : (Math.round(percentage) / 100) * 360;

        setAngleRadians(angleDeg * (Math.PI / 180));
        setX(originX + radius * Math.sin(angleRadians));
        setY(originY + radius * -Math.cos(angleRadians));
        setAngleDegrees(angleDeg);
    }, [percentage, angleRadians, originX, originY, radius]);

    return (
        <div className="position-relative p-0">
            <svg ref={sliderWrapper} height="59px" width="59px" viewBox="0 0 100 100" pointerEvents="visiblePainted">
                <SliderTrack position={{ x: originX, y: originY }} radius={radius} />

                <SliderFill
                    circleRadius={radius}
                    startPoint={{ x: originX, y: originY - radius }}
                    endPoint={{ x, y }}
                    largeArcFlag={angleDegrees > 180 ? 1 : 0}
                    sweepFlag={1}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "none",
                }}
            >
                <div className="slider-text">{`${Math.round(percentage)} %`}</div>
            </div>
        </div>
    );
}

export function SliderThumb({ position }) {
    return (
        <>
            <circle className={"sliderThumbBorder"} cx={position.x} cy={position.y} pointerEvents="none" />
            <circle className={"sliderThumb"} cx={position.x} cy={position.y} />
        </>
    );
}

export function SliderFill({ circleRadius, startPoint, endPoint, largeArcFlag, sweepFlag }) {
    return (
        <>
            <defs>
                <linearGradient id="slider-fill-gradient" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#8189ff"></stop>
                    <stop offset="100%" stopColor="#3f3cff"></stop>
                </linearGradient>
            </defs>
            <path
                className={"sliderFill"}
                strokeWidth="5"
                strokeLinecap="square"
                fill="none"
                stroke="url(#slider-fill-gradient)"
                d={`
            M ${startPoint.x}, ${startPoint.y}
            A ${circleRadius} ${circleRadius} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x},${endPoint.y}
          `}
                style={{
                    transform: "rotate(0deg)",
                    transformOrigin: "center center",
                }}
            />
        </>
    );
}
