import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const ServerError = () => {
  const nav = useNavigate()
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={()=>{
        nav('/')
      }}>Trang chủ</Button>}
    />
  )
};
export default ServerError;