import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={()=>{
        nav('/')
      }}>Trang chủ</Button>}
    />
  )
};
export default NotFound;