import Link from "next/link";

export default function Denied() {
    return (
        <section className="flex flex-col gap-12 items-center">
            <h1 className="text-5lx">Access Denied</h1>
            <p className="text-3xl max-w-2xl text-center">You don't have required access level to view this page.</p>
            <Link className="text-sky-500 hover:text-sky-600" href="/">Back to Home Page</Link>
        </section>
    );
}