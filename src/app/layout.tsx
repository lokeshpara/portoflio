import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Doe | Full Stack Developer",
  description: "Personal portfolio showcasing my skills and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* GitHub Pages SPA routing */}
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
          // This script checks to see if a redirect is present in the query string
          (function(l) {
            if (l.search[1] === '/' ) {
              var decoded = l.search.slice(1).split('&').map(function(s) { 
                return s.replace(/~and~/g, '&');
              }).join('?');
              window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location));

          // Check if we're in production (on GitHub Pages)
          if (window.location.hostname === 'lokeshpara.github.io' || 
              window.location.href.includes('/portfolio-1')) {
            document.documentElement.classList.add('production');
            console.log('Running in production mode');
          }
        `}} />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
