import { Box, Button } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/auth";
import logo from "../../assets/logo.png";
import { userAtom } from "../../atoms/atoms";
import MonthlyRanking from "../../components/MonthlyRanking";
import RankingList from "../../components/RankingList";

const Home = () => {
  const navigator = useNavigate();
  const [user] = useAtom(userAtom);
  const logout = useLogout();

  return (
    <>
      <Box sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 3,
      }}>
        {user ? (
          <div>
            <Button onClick={logout}>Logout</Button>
            <Button onClick={() => navigator('/admin')}>Admin</Button>
          </div>
        ) : (
          <div>
            <Button onClick={() => navigator('/login')}>Login</Button>
          </div>
        )}
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "white",
        }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "50%", // 너비를 컨테이너 너비의 50%로 설정
            maxWidth: "250px", // 너비의 최대 제한 설정 (필요시)
            marginBottom: "20px", // 로고와 텍스트 사이의 간격
          }}
        />
      </Box>
      <MonthlyRanking />
      <RankingList />
    </Box >
    </>
  );
}

export default Home;