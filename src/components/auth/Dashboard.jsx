import React from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = React.useState('')
    const { currentUser, logout } = useAuth()

    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch (error) {
            setError(error.message)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <button className="button" onClick={handleLogout}>Logout</button>
        </div>
    )
}
