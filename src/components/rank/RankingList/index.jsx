import { List, ListItem, Paper, Typography, Button, IconButton } from "@mui/material";
import { useDeleteRank, useFetchRankingsPaging } from "../../../api/rank";
import { Close } from "@mui/icons-material";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/atoms";

const RankingList = () => {
  const [user] = useAtom(userAtom);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFetchRankingsPaging();
  const rankings = data?.pages.flatMap((page) => page.rankings) || [];
  const { mutate: deleteRank } = useDeleteRank();

  const handleDelete = async (rankId) => {
    if (window.confirm("정말로 이 데이터를 삭제하시겠습니까?")) {
      try {
        await deleteRank(rankId);
        alert("삭제되었습니다.");
        refetch();
      } catch (e) {
        alert("삭제에 실패하였습니다.")
      }
    }
  };
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2, mt: 4 }}>
        지난게임
      </Typography>

      {/* 데이터가 있으면 */}
      {rankings.length > 0 ? (
        <List sx={{ width: "100%" }}>
          {rankings.map((rank) => (
            <Paper key={rank.id} sx={{ mb: 2, p: 2, position: "relative" }}>
              {user && (
                <IconButton
                  onClick={() => handleDelete(rank.id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "red",
                  }}
                >
                  <Close />
                </IconButton>
              )}
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
