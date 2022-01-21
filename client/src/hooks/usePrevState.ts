import {useRef , useEffect} from "react"

const usePrevState = (state:any) => {
    const prevState = useRef()

    console.log(state)

    useEffect(() => {
        prevState.current = state
    })

    return prevState.current;
}

export default usePrevState
