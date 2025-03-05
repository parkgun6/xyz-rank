import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useInsertRank } from "../../../api/rank";
import { useNavigate } from "react-router-dom";

const InsertRank = () => {
    const [gameName, setGameName] = useState("");
    const [players, setPlayers] = useState([{ position: "1등", name: "", point: "" }]);
    const dateTime = dayjs();
    const insertRankMutation = useInsertRank();
    const navigator = useNavigate();

    const handleChange = (position, field, value) => {
        setPlayers((prev) =>
            prev.map((player) => (player.position === position ? { ...player, [field]: value } : player))
        );
    };

    const addPlayer = () => {
        const newPosition = `${players.length + 1}등`;
        setPlayers((prev) => [...prev, { position: newPosition, name: "", point: "" }]);
    };

    const removePlayer = (position) => {
        setPlayers((prev) => {
            const updatedPlayers = prev.filter((player) => player.position !== position);
            return updatedPlayers.map((player, index) => ({ ...player, position: `${index + 1}등` }));
        });
    };

    const handleSubmit = async () => {
        const rankData = {
            gameName,
            ranking: players,
            dateTime: dateTime.format("YYYY-MM-DD HH:mm:ss"),
        };
        try {
            await insertRankMutation.mutateAsync(rankData)
            alert("저장이 완료되었습니다!");
            navigator(-1); // 이전 페이지로 이동
        } catch (e) {
            console.error("Error", e)
        }
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: "300px", margin: "auto", mt: 5 }}>
                <TextField label="게임 이름" value={gameName} onChange={(e) => setGameName(e.target.value)} fullWidth />
                {players.map((player) => (
                    <Box key={player.position} display="flex" alignItems="center" gap={1}>
                        <TextField
                            label={player.position}
                            value={player.name}
                            onChange={(e) => handleChange(player.position, "name", e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="점수"
                            type="number"
                            value={player.point}
                            onChange={(e) => handleChange(player.position, "point", e.target.value)}
                            sx={{ width: "80px" }}
                        />
                        <IconButton onClick={() => removePlayer(player.position)} color="error">
                            <RemoveCircleOutline />
                        </IconButton>
                    </Box>
                ))}
                <Button startIcon={<AddCircleOutline />} onClick={addPlayer}>
                    참가자 추가
                </Button>
                <TextField label="날짜 및 시간" value={dateTime.format("YYYY-MM-DD HH:mm:ss")} fullWidth disabled />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    저장하기
                </Button>
            </Stack>
        </>
    );
};

export default InsertRank;
