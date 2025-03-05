import dayjs from "dayjs";
import { useFetchRanks } from "../../api/rank";

export const useMonthlyRanking = () => {
  const { data: ranks, isLoading, error } = useFetchRanks();

  if (isLoading || error) return { ranking: [], isLoading, error };

  const thisMonth = dayjs().format("YYYY-MM");
  const monthlyRanks = ranks.filter((rank) =>
    rank.dateTime.startsWith(thisMonth)
  );

  const playerPoints = {};
  monthlyRanks.forEach((rank) => {
    rank.ranking.forEach((player) => {
      if (!playerPoints[player.name]) {
        playerPoints[player.name] = 0;
      }
      playerPoints[player.name] += Number(player.point);
    });
  });

  const ranking = Object.entries(playerPoints)
    .map(([name, point]) => ({ name, point }))
    .sort((a, b) => b.point - a.point); // 점수 높은 순 정렬

  return { ranking, isLoading, error };
};