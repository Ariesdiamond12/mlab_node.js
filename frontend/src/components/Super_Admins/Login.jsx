import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState()
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const signIn = async (event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, userName, password);
            setError(null)
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000)
        }catch(err){
            console.log(err);
            
        }
    }
    
  return (
    <div className='bg-[#003356] w-full h-screen'>
        <div className='flex justify-center items-center h-full'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg'>
                <h2 className='test-3xl font-medium text-center py-8'>Login</h2>
                {error && <p className='text-red-500'>{error.message}</p>}
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2 rounded-lg' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2 rounded-lg' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='flex justify-center'>
                <button className='py-3  bg-[#d90429] text-white rounded-full'>
                    Log In
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login