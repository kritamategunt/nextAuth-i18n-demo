import Link from "next/link"
import { Footer } from "./Footer"

export default async function Navbar({
    params: { lng },
}: {
    params: {
        lng: string;
    };
}) {
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/api/auth/signin">Sign In</Link></li>
                <li><Link href="/api/auth/signout">Sign Out</Link></li>
                {/* <li><Link href="/server">Server</Link></li> */}
                <li><Link href={`/${lng}/client`}>Client</Link></li>
                <li><Link href="/extra">Extra</Link></li>
                <li><Link href={`/${lng}/client-page`}>test i18n</Link></li>
                <Footer lng={lng} />
            </ul>
        </nav>
    )
}

