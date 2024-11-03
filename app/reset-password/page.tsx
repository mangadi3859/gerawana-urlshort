import { isAuthenticated, getUserFromCookie } from "@/lib/auth";
import ResetPassword from "./(components)/ResetPassword";
import { Navbar } from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default async function Home() {
    return (
        <>
            <main className="min-h-dvh grid place-items-center">
                <ResetPassword />
            </main>
            <Footer />
        </>
    );
}
