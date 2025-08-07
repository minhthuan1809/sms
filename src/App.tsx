import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Toaster } from 'sonner';
import router from './routes';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <RouterProvider router={router} />
      
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </ConfigProvider>
  );
};

export default App;
