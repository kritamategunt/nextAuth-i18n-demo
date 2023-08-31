'use client'
// Remember you must use an AuthProvider for 
// client components to useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '../components/UserCard'
import { useTranslation } from '@/app/i18n/client';

export default function ClientPage({
    params: { lng },
}: {
    params: {
        lng: string;
    };
}) {


    const { t } = useTranslation(lng, "client-page");

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })
    console.log(session)

    // if (session?.user.role !== "admin" && session?.user.role !== "manager") {
    //     return <h1 className='text-5xl'>Access Denied</h1>
    // }

    if (!session?.user) {
        return <div>no session</div>
    }

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Client"} />
            <h1>{t('title')}</h1>
        </section>
    )
}