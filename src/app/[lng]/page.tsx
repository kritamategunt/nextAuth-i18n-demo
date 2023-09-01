'use client'
import { Session } from "inspector";
import { useTranslation } from "../i18n";
import { Footer } from "./components/Footer";
import { useSession } from "next-auth/react";



export default async function Home({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {

  const { data: session } = await useSession();
  const { t } = await useTranslation(lng);
  return (
    <>
      
      <h1 className="text-5xl">{t('title')}</h1>
      <h1>{lng}</h1>
      
      <Footer lng={lng} />
      <div>

        <button onClick={() => alert(session?.user)}>session log</button>
      </div>
    </>

  )
}
