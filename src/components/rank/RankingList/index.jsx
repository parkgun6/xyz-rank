import { List, ListItem, Paper, Typography, Button } from "@mui/material";
import { useFetchRankingsPaging } from "../../../api/rank";

const RankingList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchRankingsPaging();
  const rankings = data?.pages.flatMap((page) => page.rankings) || [];
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt: 4 }}>
        지난게임
      </Typography>

      {/* 데이터가 있으면 */}
      {rankings.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {rankings.map((rank) => (
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
        <Typography sx={{ textAlign: "center", color: "gray" }}>
          아직 데이터가 없습니다.
        </Typography>
      )}

      {/* '더 보기' 버튼 */}
      {hasNextPage && (
        <Button
          variant="contained"
          sx={{ display: "block", mx: "auto", mt: 2 }}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "로딩 중..." : "더 보기"}
        </Button>
      )}
    </>
  );
}

export default RankingList;
