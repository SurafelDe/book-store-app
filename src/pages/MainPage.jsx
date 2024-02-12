import React, { useEffect, useState, useContext } from "react";
import Book from "../components/Book.jsx";
import { AppContext } from "../context/AppContext.jsx";
const MainPage = () => {

  const [books, setBooks] = useState([])


  const { text } = useContext(AppContext);
  
  useEffect(() => {


     fetch("https://book-store-api-jid9.onrender.com/api/book/get", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.books)) {
        setBooks(data.books);
      }
      else {
        console.error("Data is not an array.");
      }
    })
    .catch(error => console.error('Error:', error));

  }, []);

  return (

    <section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 mx-2">
        {
        books.filter((item) => item.title.includes(text)).map(
          book =>  <Book props={book}/>
        )}
    </div>
    </section>
  );
};

export default MainPage;
