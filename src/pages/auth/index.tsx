import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { Button } from "@/components/ui/button";

const Auth = () => {
	const navigate = useNavigate();
	const { isAuth } = useGetUserInfo();

	const signInWithGoogle = async () => {
		try {
			const results = await signInWithPopup(auth, provider);
			const authInfo = {
				userID: results.user.uid,
				name: results.user.displayName,
				profilePhoto: results.user.photoURL,
				isAuth: true,
			};

			Cookies.set("auth", JSON.stringify(authInfo), {
				expires: 1,
				secure: true,
				sameSite: "strict",
			});

			navigate("/expense-tracker");
		} catch (error) {
			console.error("Error signing in with Google: ", error);
		}
	};

	if (isAuth) {
		return <Navigate to="/expense-tracker" />;
	}

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<Button className="mx-auto" onClick={signInWithGoogle}>
				Sign in with Google
			</Button>
		</div>
	);
};

export default Auth;
