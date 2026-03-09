import { createContext,useState } from "react";


export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("")
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
    const [anonymousReport, setAnonymousReport] = useState(null)

    return (
        <InterviewContext.Provider value={{ 
            loading, setLoading, 
            loadingMessage, setLoadingMessage,
            report, setReport, 
            reports, setReports, 
            anonymousReport, setAnonymousReport 
        }}>
            {children}
        </InterviewContext.Provider>
    )
}