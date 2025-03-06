import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { fbdb } from "../../config/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";

export const authQueryKeys = {
  ranks: ['ranks'],
};

const PAGE_SIZE = 10; // 한 번에 가져올 데이터 개수

export const useFetchRankingsPaging = () => {
  return useInfiniteQuery({
    queryKey: ["rankings"],
    queryFn: async ({ pageParam = null }) => {
      const rankCollection = collection(fbdb, "rank");
      let rankQuery = query(rankCollection, orderBy("dateTime", "desc"), limit(PAGE_SIZE))
      
      if (pageParam) {
        rankQuery = query(rankCollection, orderBy("dateTime", "desc"), startAfter(pageParam), limit(PAGE_SIZE));
      }

      try {
        const snapshot = await getDocs(rankQuery);
        
        if (snapshot.empty) {
          return { rankings: [], lastVisible: null }; // 빈 데이터를 반환
        }

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];

        const rankings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return { rankings, lastVisible };
      } catch (error) {
        console.error("Error fetching rankings:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.lastVisible || undefined;
    },
  });
};


export const useFetchRanks = () => {
  return useQuery({
    queryKey: authQueryKeys.ranks,
    queryFn: async () => {
      try {
        const querySnapshot = await getDocs(collection(fbdb, "rank"));
        return querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore 문서 ID
          ...doc.data(),
        }));
      } catch (e) {
        console.error("Error fetching ranks: ", e);
        throw e;
      }
    },
  });
};

export const useInsertRank = () => {
  return useMutation({
    mutationFn: async (rankData) => {
      try {
        const docRef = await addDoc(collection(fbdb, "rank"), {
          gameName: rankData.gameName,
          ranking: rankData.ranking,
          dateTime: rankData.dateTime
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  })
}

export const useDeleteRank = () => {
  return useMutation({
    mutationFn: async (rankId) => {
      try {
        const rankDocRef = doc(fbdb, "rank", rankId); 
        await deleteDoc(rankDocRef); 
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  });
};
