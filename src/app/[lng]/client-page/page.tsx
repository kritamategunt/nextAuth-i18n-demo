'use client'
import Link from "next/link";
import { useState } from "react";
import { Footer } from "../components/Footer/client";
import { useTranslation } from "../../i18n/client";
import Head from "next/head";

export default function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(lng, "client-page");
  const [counter, setCounter] = useState(0);
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <h1>{t("title")}</h1>
      <p>{t("counter", { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      <Link href={`/${lng}`}>
        <button type="button">{t("back-to-home")}</button>
      </Link>
      <Footer lng={lng} />
    </>
  );
}
