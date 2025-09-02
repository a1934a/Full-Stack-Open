import { useEffect } from "react"

const Notification = ({ message, setMessage, color = "green" }) => {

    const errorStyle = {
        "color": color,
        "background": "lightgrey",
        "fontSize": "14px",
        "borderStyle": "solid",
        "borderRadius": "4px",
        "padding": "8px",
        "marginBottom": "10px"
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null)
        }, 3000)
        return () => clearTimeout(timer)
    }, [message])


    if (message === null) {
        return null
    }

    return (
        <div style={errorStyle}>
            {message}
        </div>
    )
}

export default Notification