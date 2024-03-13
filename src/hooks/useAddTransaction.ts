import { FormSchema } from "@/components/shared/ExpenseForm";
import { db } from "@/config/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import { useGetUserInfo } from "./useGetUserInfo";

type TransactionData = z.infer<typeof FormSchema>;

export const useAddTransaction = () => {
	const transactionCollectionRef = collection(db, "transactions");
	const { userID } = useGetUserInfo();

	const addTransaction = async (transaction: TransactionData) => {
		const { description, amount, type } = transaction;
		try {
			await addDoc(transactionCollectionRef, {
				userID,
				description,
				transactionAmount: amount,
				transactionType: type,
				createdAt: serverTimestamp(),
			});
		} catch (error) {
			console.error(error);
		}
	};

	return { addTransaction };
};
