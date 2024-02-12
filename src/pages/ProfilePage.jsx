import { useEffect, useState, useContext } from "react";
import Order from "../components/Order.jsx";
import { AppContext } from "../context/AppContext.jsx";

const ProfilePage = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const { text } = useContext(AppContext);

    useEffect(() => {
        setIsLoading(true);

        const email = localStorage.getItem('email')
        fetch("https://book-store-api-jid9.onrender.com/api/user/get", {
            method: 'POST',
            body: JSON.stringify({ email}),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json()) // Log raw response body
        .then(data => {
        if (data.user) {

            console.log(data)
            setUser(data.user)
        }
        else {
            console.error("User info is not found");
        }
        })
        .catch(error => console.error('Error:', error))
            
        setIsLoading(false)
    }, [])

    if(isLoading) {
        return(
            <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
                <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
            </div> 
        )
    }

    return (
        user ? 
        <div className="w-full text-white bg-main-color">
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    {/* Left Side */}
                    <div className="w-full md:w-3/12 md:mx-2">
                        {/* Profile Card */}
                        <div className="bg-white p-3 border-t-4 border-green-400 mt-8">
                            <div className="image overflow-hidden">
                                {/* <img
                                    className="h-auto w-full mx-auto"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrT6C69Ss_nxyBvNqmik6mNdDcl5ssPca-O5GpKGLmN9M80BvAeaxOy2QwX_lfTv7DlLU&usqp=CAU"
                                    alt=""
                                /> */}
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                {`${user.firstName} ${user.lastName}`}
                            </h1>
                            <a className="text-blue-800" href="mailto:jane@example.com">
                                {user.email}
                            </a>
                            {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">
                                Owner at Her Company Inc.
                            </h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                                non deserunt
                            </p> */}
                            <div className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <div className="flex items-center py-3">
                                    <span>Points - {user.points}</span>
                                    {/* <span className="ml-auto">
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                            Active
                                        </span>
                                    </span> */}
                                </div>

                                <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-2  rounded-full tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                                >
                                    {"Recharge"}
                                </button>
                                </div>
                                {/* <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(user.createdAt)}</span>
                                </li> */}
                            </div>
                        </div>
                        {/* End of profile card */}
                        <div className="my-4" />

                    </div>
                    {/* Right Side */}
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        {/* Profile tab */}

                        {
                        (Array.isArray(user.orders) && user.orders.length !== 0) ?
                            <div className="my-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mx-2">
                                        {
                                            user.orders.filter((item) => item.book.title.includes(text)).map(
                                                order =>  <Order props={order}/>
                                        )}
                                </div>
                            </div>
                            : <p className="text-black text-3xl text-center font-sans mt-24"> You don't have any books in your store</p>

                        }
                </div>
                </div>  
            </div>
        </div> : <></>
        )
}

export default ProfilePage;