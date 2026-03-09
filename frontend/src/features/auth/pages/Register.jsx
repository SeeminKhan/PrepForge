import React,{useState, useContext} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { InterviewContext } from '../../interview/interview.context'
import { saveAnonymousReport } from '../../interview/services/interview.api'
import LoadingScreen from '../../../components/LoadingScreen'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading, loadingMessage, handleRegister} = useAuth()
    const { anonymousReport, setAnonymousReport, setReport } = useContext(InterviewContext)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({username,email,password})
        
        if (success) {
            // If there's an anonymous report, save it
            if (anonymousReport) {
                try {
                    const response = await saveAnonymousReport(anonymousReport)
                    setReport(response.interviewReport)
                    setAnonymousReport(null)
                    navigate(`/interview/${response.interviewReport._id}`)
                } catch (error) {
                    console.error('Failed to save anonymous report:', error)
                    navigate('/')
                }
            } else {
                navigate('/')
            }
        }
    }

    if(loading){
        return <LoadingScreen message={loadingMessage || "Creating your account..."} variant="default" />
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                {anonymousReport && (
                    <div style={{
                        backgroundColor: '#6366F1',
                        color: 'white',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        fontSize: '0.9rem'
                    }}>
                    Create an account to save your interview report!
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>

                    <button className='button primary-button' >Register</button>

                </form>

                <p>Already have an account? <Link to={"/login"} >Login</Link> </p>
            </div>
        </main>
    )
}

export default Register