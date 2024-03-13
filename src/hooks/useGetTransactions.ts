import { useEffect, useState } from "react";
import {
	Timestamp,
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "@/config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export interface Transaction {
	id: string;
	description: string;
	transactionAmount: number;
	transactionType: "income" | "expense";
	userID: string;
	createdAt: Timestamp | Date;
}

export const useGetTransactions = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const transactionCollectionRef = collection(db, "transactions");
	const { userID } = useGetUserInfo();

	useEffect(() => {
		if (!userID) return;

		const queryTransactions = query(
			transactionCollectionRef,
			where("userID", "==", userID),
			orderBy("createdAt")
		);

		const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
			const transactionsData = snapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					description: data.description,
					transactionAmount: data.transactionAmount,
					transactionType: data.transactionType,
					userID: data.userID,
					createdAt: data.createdAt.toDate(),
				};
			}) as Transaction[];
			setTransactions(transactionsData);
		});

		return () => unsubscribe();
	}, [userID]);

	return { transactions };
};
