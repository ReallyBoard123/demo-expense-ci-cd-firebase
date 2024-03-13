import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuth, signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

interface LogoutAvatarProps {
	src: string;
}

export const LogoutAvatar = ({ src }: LogoutAvatarProps) => {
	const auth = getAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			Cookies.remove("auth");
			navigate("/");
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};
	return (
		<div className="fixed top-4 right-4 flex flex-col items-center">
			<Avatar>
				<AvatarImage src={src} alt="User Avatar" />
				<AvatarFallback>U</AvatarFallback>
			</Avatar>
			<Button
				className="text-xs mt-1 text-blue-700 hover:text-blue-900 bg-transparent hover:bg-transparent "
				onClick={handleSignOut}
			>
				Logout
			</Button>
		</div>
	);
};
