import Header from './Header.jsx'
import { useState } from 'react';
import { AppContext } from '../context/AppContext.jsx'

function Layout(props) {
    const [text, setText] = useState("");


    return <AppContext.Provider value={{ text, setText }}>
        <div>
            <Header />
            <main style={{ margin: 'auto', maxWidth: '70rem' }}>
                {props.children}
            </main>
        </div>
    </AppContext.Provider>
}

export default Layout