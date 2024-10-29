import Link from "next/link";
import { headers } from "next/headers";
export default async function NotFound() {
    const headersList = await headers();
    const domain = headersList.get("host");
    return (
        <div className="flex flex-col justify-center items-center gap-2 h-dvh">
            <h2 className="text-4xl font-bold">
                Not Found <span className="text-primary">404</span>
            </h2>
            <p>Could not find requested resource</p>
            <p>
                Back to{" "}
                <Link href="/" className="text-primary font-bold">
                    home
                </Link>
            </p>
        </div>
    );
}
