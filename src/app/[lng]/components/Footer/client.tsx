"use client";

import { FooterBase } from "./FooterBase";
import { useTranslation } from "../../../i18n/client";

export const Footer = ({ lng, path }: { lng: string; path?: string }) => {
  const { t } = useTranslation(lng, "footer");
  return <FooterBase t={t} lng={lng} />;
};
