import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";

export const useDeleteTransaction = (): {
	deleteTransaction: (id: string) => Promise<void>;
} => {
	const deleteTransaction = async (id: string): Promise<void> => {
		const transactionDocRef = doc(db, "transactions", id);
		try {
			await deleteDoc(transactionDocRef);
		} catch (error) {
			console.error(error);
		}
	};

	return { deleteTransaction };
};
