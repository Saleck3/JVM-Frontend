import { useSession } from 'next-auth/react';

const useUserData = () => {
	const { data } = useSession();
	const user = data?.user;
	const token = user?.accessToken;

	return {
		user,
		token,
	};
};

export default useUserData;
