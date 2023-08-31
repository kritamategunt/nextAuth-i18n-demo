import '../globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthProvider'
import { languages } from '../i18n/setting'
import { dir } from 'i18next'




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth i18n',

}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children, params: { lng }
}: {
  children: React.ReactNode;
  params: {
    lng: string
  }
}) {
  console.log(lng)
  return (
    <html lang={lng} dir={dir(lng)}>
      <head/>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar params={lng} />
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}

          </main>

        </AuthProvider>
      </body>
    </html>
  )
}
