import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {
      setErrorMessage('')
      setIsLoading(true)

      const response = await fetch('https://book-store-api-jid9.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      const { token, user, error } = data;

      console.log(data)
      console.log(user)
      console.log(user.id)
      if (response.status === 200 && !error) {

        localStorage.setItem('token', token);
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('email', user.email);
        localStorage.setItem('userId', user.id);

        // document.cookie = `user=${JSON.stringify(user)}; path=/`;

        navigate('/main', { replace: true });
        console.log('Login successful!');

        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
      } else {
        setErrorMessage('Login failed')
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      setErrorMessage('Error logging in:', error.message)
      console.error('Error logging in:', error.message);
      // Optionally handle error here
    } finally{
      setIsLoading(false)
    }
  };

  const toRegisterPage = async(e) => {
    e.preventDefault();
    
    navigate('/register', { replace: true })
  }

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
      }}
    >
      <div className="absolute  opacity-50 inset-0 z-0" />
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <h1 className="mb-3 font-bold text-5xl">Hi ? <br />Welcome Back to Our Book Store </h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor='email' className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="email"
                    id='email'
                    placeholder="Enter your email"
                    ref={emailInputRef}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor='password' className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    id='password'
                    type="password"
                    placeholder="Enter your password"
                    ref={passwordInputRef}
                  />
                </div>

                <div className="mt-2 text-gray-400">
                      <label>You don't have an account? </label>
                      <label  onClick={toRegisterPage} className="text-sm font-medium text-green-500">
                          {"Sign Up"}
                        </label>
                      </div> 
                  {
                    (errorMessage) ? 
                    <div className="mt-2">
                      <label className="text-sm font-medium text-red-500">
                          {errorMessage}
                        </label>
                      </div> : <></>
                  }
                
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="/" className="text-green-400 hover:text-green-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)
}

export default LoginPage;