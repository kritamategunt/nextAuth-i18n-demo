import { useTranslation } from "../../../i18n";
import { FooterBase } from "./FooterBase";

export const Footer = async ({ lng, path }: { lng: string, path?: string }) => {
  const { t } = await useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} />;
};
