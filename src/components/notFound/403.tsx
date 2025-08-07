import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const nav = useNavigate();
  
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button 
          type="primary" 
          onClick={() => {
            nav('/');
          }}
        >
          Trang chủ
        </Button>
      }
    />
  );
};

export default Unauthorized;    