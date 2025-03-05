import { Navigate, Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../../atoms/atoms';

const ProtectedRoute = () => {
  const [user] = useAtom(userAtom); // 로그인 상태 확인

  // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 로그인된 경우에는 하위 컴포넌트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;