import { useTranslation } from "../i18n";
import { Footer } from "./components/Footer";



export default async function Home({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {

  const { t } = await useTranslation(lng, "second-page");
  return (
    <>
      <h1 className="text-5xl">{t('title')}</h1>
      <h1>{lng}</h1>
      <Footer lng={lng} />
    </>

  )
}
