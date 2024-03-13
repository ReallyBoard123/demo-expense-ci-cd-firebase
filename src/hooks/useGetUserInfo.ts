import Cookies from "js-cookie";

interface UserInfo {
	name: string;
	profilePhoto: string;
	userID: string;
	isAuth: boolean;
}

export const useGetUserInfo = (): UserInfo => {
	const authInfo: UserInfo = Cookies.get("auth")
		? JSON.parse(Cookies.get("auth") || "{}")
		: {};

	const { name, profilePhoto, userID, isAuth } = authInfo;

	return { name, profilePhoto, userID, isAuth };
};
