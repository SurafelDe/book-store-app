import { useState } from "react";

const Book = (props) => {
    const bookData = props.props;
    
    const [isLoading, setIsLoading] = useState(false)

    async function onPurchase(e) {
        e.preventDefault();
        try {
            setIsLoading(true)

            const userId = Number(localStorage.getItem('userId'))
            const response = await fetch('https://book-store-api-jid9.onrender.com/api/order/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"userId" : userId, "bookId" : Number(bookData.id) })
            });
        
            const data = await response.json();
            
            if (response.status === 200) {
                alert(data.message);
            } else {
                alert(data.error)
                console.error('', data.status);
            }
        } catch (error) {
            alert('Error when ordering:', error.message)
            console.error('Error when ordering:', error.message);
            // Optionally handle error here
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="relative flex flex-col mb-8 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-2 mt-2 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                <img
                    src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
                    className="h-full w-full object-cover"
                    alt=""
                />
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p className="block font-sans text-base font-semibold leading-relaxed text-blue-gray-900 antialiased">
                        {bookData.title}
                    </p>
                    <p className="block font-sans text-base font-semibold leading-relaxed text-blue-gray-900 antialiased">
                        ${bookData.price}
                    </p>
                </div>
                <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                    Author: <span>{bookData.writer}</span>
                </p>
                <div className="flex justify-start mt-3">
                        {
                        bookData.tags.map(
                            tag => <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 mr-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                {tag}
                            </span>
                        )}
                </div>
                
            </div>
            <div className="p-5 pt-0">
                <button
                    className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    disabled={isLoading}
                    type="button"
                    onClick={onPurchase}
                >
                    {isLoading ? "Ordering..." : "Order book"}
                </button>
            </div>
        </div>
    );
    };

export default Book;