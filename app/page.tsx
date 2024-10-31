import HomePage from "./(components)/HomePage";
import { isAuthenticated, getUserFromCookie } from "@/lib/auth";

export default async function Home() {
    let isAuth = await isAuthenticated();
    let user = await getUserFromCookie();

    return <HomePage isAuth={isAuth} user={user} />;
}
