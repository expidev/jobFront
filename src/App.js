import React from 'react';
import Menu from './core/Menu';
import MainRouter from './MainRouter';

function App() {
    return (
        <div className="App">
            <Menu />
            <main>
                <MainRouter />
            </main>
        </div>
    );
}

export default App;