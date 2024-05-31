import { error } from "console";

export const register = async (
    firstName: string,
    lastname: string,
    email: string,
    password: string
) => {
    const url = `/api/auth/register`;
    console.log("URL front: ", url);
    const body = JSON.stringify({
        firstName,
        lastname,
        email,
        password
    });

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    });
    if (!res.ok) {
        const resError = await res.json();
        console.log(resError);
        throw new Error("pinga");
    }
    const data = await res.json();
    return data;

};