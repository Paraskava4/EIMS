import React from "react";

const TextField = () => {
    const [userInput, setUserInput] = useState("");
    const handleInput = (e) => {
        const formattedNumber = formatNumber(e.target.value);
        setUserInput(formattedNumber);
    };

    const formatNumber = (value) => {
        return value.replace(/[^\d]/g, "");
    };
    return <input onChange={(e) => handleInput(e)} value={userInput} />;
};

export default TextField;
