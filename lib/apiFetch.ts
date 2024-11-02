import getBaseUrl from "./getBaseUrl";

export type APIReturn<T> = {
    status: string;
    message?: string;
    data?: T;
    type?: string;
};

export async function apiGET<T>(route: string, token: string): Promise<APIReturn<T>> {
    let res = await fetch(`${getBaseUrl()}${route}`, { headers: { Authorization: token }, cache: "no-cache" });
    let data = await res.json();
    return data;
}

export async function apiPOST<T>(route: string, token: string, body: Object): Promise<APIReturn<T>> {
    let res = await fetch(`${getBaseUrl()}${route}`, { body: JSON.stringify(body), method: "POST", headers: { Authorization: token }, cache: "no-cache" });
    let data = await res.json();
    return data;
}
