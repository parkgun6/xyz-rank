import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box } from "@mui/material";
import { useMonthlyRanking } from "../../../hooks/useMonthlyRanking";

const MonthlyRanking = () => {
  const { ranking, isLoading, error } = useMonthlyRanking();
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          📊 이번 달 전체 랭킹
        </Typography>
        {ranking.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>순위</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>이름</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>점수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}등</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell sx={{ textAlign: "right" }}>{player.point}점</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ textAlign: "center", color: "gray" }}>
            아직 데이터가 없습니다.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MonthlyRanking;