import React, { useState } from "react";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteTransaction } from "@/hooks/useDeleteTransaction";
import { useEditTransaction } from "@/hooks/useEditTransaction";
import { Transaction } from "@/hooks/useGetTransactions";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface TransactionsTableProps {
	transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
	const { deleteTransaction } = useDeleteTransaction();
	const { editTransaction } = useEditTransaction();

	const [editId, setEditId] = useState<string | null>(null);
	const [editFormData, setEditFormData] = useState<Partial<Transaction> | null>(
		null
	);

	const handleEditClick = (transaction: Transaction) => {
		setEditId(transaction.id);
		setEditFormData({
			description: transaction.description,
			transactionAmount: transaction.transactionAmount,
			transactionType: transaction.transactionType,
			createdAt: transaction.createdAt,
		});
	};

	const handleSaveClick = async () => {
		if (editId && editFormData) {
			await editTransaction(editId, editFormData);
			setEditId(null);
			setEditFormData(null);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		field: keyof Transaction
	) => {
		setEditFormData((prev) => ({
			...prev!,
			[field]:
				field === "transactionAmount" ? Number(e.target.value) : e.target.value,
		}));
	};

	const totalAmount = transactions.reduce((acc, transaction) => {
		return transaction.transactionType === "expense"
			? acc - transaction.transactionAmount
			: acc + transaction.transactionAmount;
	}, 0);

	return (
		<Table>
			<TableCaption>Your Recent Transactions</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Description</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Amount ($)</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.map((transaction) => (
					<TableRow key={transaction.id}>
						{editId === transaction.id ? (
							<>
								<TableCell>
									<input
										type="text"
										value={editFormData?.description || ""}
										onChange={(e) => handleChange(e, "description")}
										className="w-full px-2 py-1 text-sm rounded-md"
									/>
								</TableCell>
								<TableCell>
									<select
										value={editFormData?.transactionType || "expense"}
										onChange={(e) => handleChange(e, "transactionType")}
										className="w-full px-2 py-1 text-sm rounded-md"
									>
										<option value="expense">Expense</option>
										<option value="income">Income</option>
									</select>
								</TableCell>
								<TableCell>
									<input
										type="number"
										value={editFormData?.transactionAmount || 0}
										onChange={(e) => handleChange(e, "transactionAmount")}
										className="w-full px-2 py-1 text-sm text-right rounded-md"
									/>
								</TableCell>
								<TableCell>
									{transaction.createdAt &&
										format(
											transaction.createdAt instanceof Timestamp
												? transaction.createdAt.toDate()
												: transaction.createdAt,
											"MM/dd/yyyy"
										)}
								</TableCell>
								<TableCell className="flex gap-2 cursor-pointer">
									<FiSave onClick={handleSaveClick} />
									<FiXCircle onClick={() => setEditId(null)} />
								</TableCell>
							</>
						) : (
							<>
								<TableCell>{transaction.description}</TableCell>
								<TableCell>{transaction.transactionType}</TableCell>
								<TableCell>
									{transaction.transactionAmount.toFixed(2)}
								</TableCell>
								<TableCell>
									{format(
										transaction.createdAt instanceof Timestamp
											? transaction.createdAt.toDate()
											: transaction.createdAt,
										"MM/dd/yyyy"
									)}
								</TableCell>
								<TableCell className="flex gap-2 cursor-pointer">
									<FiEdit onClick={() => handleEditClick(transaction)} />
									<AiOutlineDelete
										onClick={() => deleteTransaction(transaction.id)}
									/>
								</TableCell>
							</>
						)}
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={4}>Total Balance</TableCell>
					<TableCell>${totalAmount.toFixed(2)}</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
