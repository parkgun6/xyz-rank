import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useSetAtom } from 'jotai';
import { userAtom } from '../../atoms/atoms';
import { firebase_app } from '../../../firebase-config';

const db = getFirestore(firebase_app);

export const authQueryKeys = {
  auth: ['auth'],
};

export const useLogin = () => {
  const setUser = useSetAtom(userAtom);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const { username, password } = loginData;
      const response = await getDocs(collection(db, "users"));
      const resUsername = response.docs[0].data().username;
      const resPassword = response.docs[0].data().password;
      if (resUsername === username & resPassword === password) {
        setUser({ username: username });
        setAuthError(null);
        queryClient.invalidateQueries({ queryKey: authQueryKeys.auth });
        alert('로그인완료!')
      } else {
        alert('아이디 혹은 패스워드가 맞지 않습니다.');
      }
    },
  });

  return loginMutation;
};

export const useLogout = () => {
  const setUser = useSetAtom(userAtom);
  return () => setUser(null);
};