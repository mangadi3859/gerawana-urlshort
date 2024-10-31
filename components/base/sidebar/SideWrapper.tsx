import { isAuthenticated, getUserFromCookie } from "@/lib/auth";
import { AppSidebar } from "./app-sidebar";

//I love type inferation <3
type UnPromisifiedUser<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer R> ? NonNullable<R> : never;
export default async function SideWrapper() {
    let isAuth = await isAuthenticated();
    let user = (await getUserFromCookie()) as UnPromisifiedUser<typeof getUserFromCookie>;
    return <AppSidebar isAuth={isAuth} user={user} />;
}
