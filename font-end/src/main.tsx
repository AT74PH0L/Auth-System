import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // คุณต้องสร้างไฟล์นี้และเพิ่ม CSS (เช่น Tailwind CSS)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);