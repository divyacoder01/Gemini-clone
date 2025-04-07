import React from 'react';
import { ContextProvider } from './context/Context';
import Mainbar from './Components/Mainbar/Mainbar';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <ContextProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Mainbar />
      </div>
    </ContextProvider>
  );
}

export default App;