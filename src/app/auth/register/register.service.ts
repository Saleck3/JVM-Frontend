export const register = async (
    name: string,
    lastname: string,
    email: string,
    password: string
) => {
    const url = `/api/auth/register`;
    console.log("URL front: ", url);
    const body = JSON.stringify({
        name,
        lastname,
        email,
        password
    });

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body
        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        console.error('register service error', e.message);
    }
};
