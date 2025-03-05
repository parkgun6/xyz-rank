import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { firebase_app } from "../firebase/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const db = getFirestore(firebase_app);


export const authQueryKeys = {
  ranks: ['ranks'],
};

export const useFetchRanks = () => {
  return useQuery({
    queryKey: authQueryKeys.ranks,
    queryFn: async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rank"));
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
        const docRef = await addDoc(collection(db, "rank"), {
          gameName: rankData.gameName,
          ranking: rankData.ranking,
          dateTime: rankData.dateTime
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  })
}
