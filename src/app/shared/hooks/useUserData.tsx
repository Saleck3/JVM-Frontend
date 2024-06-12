import { useSession } from 'next-auth/react';
import { Player } from '../types/user.type';

const useUserData = () => {
	const { data } = useSession();
	const user = data?.user;
	const token = user?.accessToken;

	const getPlayer = (alias: string): Player => {
		return user?.players.find((user) => user.alias === alias) as Player;
	};

	return {
		user,
		token,
		getPlayer,
	};
};

export default useUserData;
