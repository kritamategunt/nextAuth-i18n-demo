import UserCard from "../components/UserCard"
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { useTranslation } from "@/app/i18n"
import { Footer } from "../components/Footer"
import { getServerSession } from "next-auth"


export default async function ServerPage() {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
   
    
    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
    
        </section>
    )

}
