import  { useState } from "react";


export const useCounter = (initalValue = 100) => {

    const [count, setCount] = useState(initalValue)

    function inc() {
        setCount(count + 1)
    }
   

    return [count, inc,]
}