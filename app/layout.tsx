import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
} from 'next/font/google';

import './globals.css';

import ThemeProvider from '@/components/providers/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {

  metadataBase: new URL("https://app-controle-de-financas.vercel.app"),

  title: 'Controle de Finanças',
  description: 'Sistema acompanhamento e controle de finanças e investimento.',

  keywords: [
    "Controle de Finanças",
    "Finanças",
    "Investimentos",
  ],

  authors: [{ name: "Talyson Robert" }],

  creator: "T.Robert",


  openGraph: {
    title: "Controle de Finanças",
    description:"Sistema acompanhamento e controle de finanças e investimento.",
    url: "https://app-controle-de-financas.vercel.app",
    siteName: "Controle de Finanças",

    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Controle de Finanças",
      },
    ],

    locale: "pt_BR",

    type: "website",
  },


};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}