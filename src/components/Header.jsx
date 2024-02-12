import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const [user, setUser] =  useState(null);
  const navigate = useNavigate();

  const { setText } = useContext(AppContext);


  useEffect(() => {
    const asd = {
      'firstName': localStorage.getItem('firstName'),
      'lastName': localStorage.getItem('lastName'),
      'email': localStorage.getItem('email'),
    };
    setUser(asd
    )
  },[])

  const onLogout = (e) => {
    localStorage.clear();
    navigate('/')
  }

  const onProfileClicked = (e) => {
    navigate('/profile')
  }

  const onMainIconClicked = (e) => {
    navigate('/main', {replace: true})
  }

  return (
    <div>
      <header className="mx-10 px-6 sm:px-10 md:px-40 flex justify-between items-center py-2 ">
        <div className="flex items-center"  onClick={onMainIconClicked}>
          <img className="h-12" src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="logo" />
          
          <div className="text-[#3b5b80] ml-6 text-2xl">Book Store</div>
        </div>
        <div className="w-3/5">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-3 ps-10 text-sm border w-1/2 border-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Seach books by title.."
              required
              onChange= {(e) => setText(e.target.value)}
            />
          </div>
        </div>

        {user !== null ?
        <Dropdown label="" dismissOnClick={true} 
          renderTrigger={() => <div className="flex space-x-2">
              <img src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" alt="" className="h-12"/>
              <div className="p-2 hidden md:block">{user.firstName} {user.lastName}</div>
            </div> }>
          <Dropdown.Item onClick={onProfileClicked}>My Profile</Dropdown.Item>
          <Dropdown.Item onClick={onLogout}>Log Out</Dropdown.Item>
        </Dropdown> : <></>}
        
      </header>
      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default Header;
