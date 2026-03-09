import React,{useState, useContext} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { InterviewContext } from '../../interview/interview.context'
import { saveAnonymousReport } from '../../interview/services/interview.api'
import LoadingScreen from '../../../components/LoadingScreen'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const { anonymousReport, setAnonymousReport, setReport } = useContext(InterviewContext)
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({email,password})
        
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
        return <LoadingScreen message="Logging you in..." variant="default" />
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
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
                      Login to save your interview report!
                    </div>
                )}
                <form onSubmit={handleSubmit}>
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
                    <button className='button primary-button' >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
            </div>
        </main>
    )
}

export default Login