import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf, saveAnonymousReport } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports, anonymousReport, setAnonymousReport } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            
            if (response && response.isAuthenticated) {
                // User is logged in, report is saved
                setReport(response.interviewReport)
            } else if (response) {
                // Anonymous user, store report temporarily
                setAnonymousReport(response.interviewReport)
                setReport(response.interviewReport)
            }
        } catch (error) {
            console.error("Error generating report:", error)
            throw error
        } finally {
            setLoading(false)
        }

        return response
    }

    const saveAnonymousReportAfterLogin = async () => {
        let reportToSave = anonymousReport
        
        // If no report in context, try localStorage
        if (!reportToSave) {
            const storedReport = localStorage.getItem('previewReport')
            if (storedReport) {
                try {
                    reportToSave = JSON.parse(storedReport)
                } catch (error) {
                    console.error('Failed to parse stored report:', error)
                    return null
                }
            }
        }

        if (!reportToSave) return null

        setLoading(true)
        try {
            const response = await saveAnonymousReport(reportToSave)
            setReport(response.interviewReport)
            setAnonymousReport(null) // Clear anonymous report after saving
            localStorage.removeItem('previewReport') // Clean up localStorage
            return response.interviewReport
        } catch (error) {
            console.log(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            if (response && response.interviewReport) {
                setReport(response.interviewReport)
            }
        } catch (error) {
            console.error("Error fetching report:", error)
        } finally {
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            if (response && response.interviewReports) {
                setReports(response.interviewReports)
            }
        } catch (error) {
            console.error("Error fetching reports:", error)
            setReports([])
        } finally {
            setLoading(false)
        }

        return response?.interviewReports || []
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // Don't auto-fetch on mount - let components decide when to fetch
    // This prevents 401 errors for anonymous users

    return { loading, report, setReport, reports, anonymousReport, generateReport, getReportById, getReports, getResumePdf, saveAnonymousReportAfterLogin }

}