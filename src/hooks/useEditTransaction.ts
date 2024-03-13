import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { Transaction } from "@/hooks/useGetTransactions";

export const useEditTransaction = () => {
	const editTransaction = async (
		id: string,
		transaction: Partial<Transaction>
	) => {
		const transactionDocRef = doc(db, "transactions", id);
		try {
			await updateDoc(transactionDocRef, {
				...transaction,
				updatedAt: serverTimestamp(),
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { editTransaction };
};
