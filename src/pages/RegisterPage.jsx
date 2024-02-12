import {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setErrorMessage('')
      setIsLoading(true)

      const response = await fetch('https://book-store-api-jid9.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
  
      const data = await response.json();
      const { message, error } = data;

      console.log(data)
      
      
      if (response.status === 200 && message) {

        navigate('/', { replace: true });

        // alert(message)
        
        console.log('Registration successful!');

        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';

      } else {
        setErrorMessage('Registration failed')
        console.error('Registration failed:', error);
      }
    } catch (error) {
      setErrorMessage('Error registering:', error.message)
      console.error('Error registering:', error.message);
      // Optionally handle error here
    } finally{
      setIsLoading(false)
    }
  };

  const toLoginPage = async(e) => {
    e.preventDefault();

    navigate('/', { replace: true })
  }


    return(
      
        <div
          className="bg-no-repeat bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=3628&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
          }}
        >
          <div className="absolute opacity-50 inset-0 z-0" />
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
              <div className="self-start hidden lg:flex flex-col  text-white">
                <img src="" className="mb-3" alt='' />
                <h1 className="mb-3 font-bold text-5xl">Hi ? <br/>Welcome Back to Our Book Store </h1>
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
                  <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
                  <p className="text-gray-500">Please fill the following information first.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700 tracking-wide">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        ref={firstNameRef}
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type=""
                        placeholder="Your first name..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700 tracking-wide">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        ref={lastNameRef}
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type=""
                        placeholder="Your last name..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 tracking-wide">
                        Email
                      </label>
                      <input
                      id="email"
                      ref={emailRef}
                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type="email"
                        placeholder="mail@gmail.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                        Password
                      </label>
                      <input
                        id="password"
                        ref={passwordRef}
                        className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="mt-2 text-gray-400">
                      <label>Already have an account? </label>
                      <label  onClick={ toLoginPage } className="text-sm font-medium text-green-500">
                          {"Sign In"}
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
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                      >
                        {isLoading ? "Creating account..." : "Creating account"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>)
}
  

export default RegisterPage