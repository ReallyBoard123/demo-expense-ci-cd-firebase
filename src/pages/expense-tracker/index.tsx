import ExpenseForm from "@/components/shared/ExpenseForm";
import { LogoutAvatar } from "@/components/shared/LogoutAvatar";
import { TransactionsTable } from "@/components/shared/TransactionsTable";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";

const ExpenseTracker = () => {
	const { transactions } = useGetTransactions();
	const { profilePhoto } = useGetUserInfo();

	return (
		<div className="relative w-full h-screen">
			<LogoutAvatar src={profilePhoto} />
			<div className="flex justify-center items-center w-full h-screen">
				<div className="w-2/3 mx-auto">
					<TransactionsTable transactions={transactions} />
					<ExpenseForm />
				</div>
			</div>
		</div>
	);
};

export default ExpenseTracker;
