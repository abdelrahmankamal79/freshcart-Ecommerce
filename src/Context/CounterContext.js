import axios from "axios";
import { createContext, useState } from "react";


export let CounterContext = createContext();


export default function CounterContextProvider(props){

    let [countt , setCount] = useState(0);

    



    return <CounterContext.Provider value={{countt ,setCount}}>
                {props.children}
            </CounterContext.Provider>

}