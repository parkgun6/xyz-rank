import React from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/auth";
import { userAtom } from "../../atoms/atoms";
import { Button } from "@mui/material";
import { useFetchRanks } from "../../api/rank";
import { List, ListItem, Typography, Paper, Box } from "@mui/material";
import MonthlyRanking from "../../components/monthlyTop/MonthlyRanking";
import logo from "../../assets/logo.png";

const Home = () => {
  const navigator = useNavigate();
  const [user] = useAtom(userAtom);
  const logout = useLogout();
  const { data: ranks, isLoading } = useFetchRanks();
  if (isLoading) return <p>Loading...</p>

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
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt: 4 }}>
        지난게임
      </Typography>
      {ranks.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {ranks.map((rank) => (
            <Paper key={rank.id} sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {rank.gameName} - {rank.dateTime}
              </Typography>
              <List dense>
                {rank.ranking.map((player, index) => (
                  <ListItem key={index} sx={{ pl: 2 }}>
                    <Typography sx={{ typography: { xs: "body2", sm: "body1" } }}>
                      {player.position}: {player.name} ({player.point}점)
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography sx={{ textAlign: "center", color: "gray" }}>아직 데이터가 없습니다.</Typography>
      )}
    </Box >
    </>
  );
}

export default Home;