import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QueroImprimir3D | Marketplace de Impressão 3D",
  description: "Conectamos donos de impressoras 3D a usuários interessados em fabricar suas peças sob medida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}


