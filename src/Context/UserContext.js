import { createContext, useState } from "react";


export let UserContext =createContext();

export default function UserContextprovider(props){

    const [userToken, setUserToken] = useState(null)

    return <UserContext.Provider value={{userToken , setUserToken}}>
        {props.children}
    </UserContext.Provider>

}