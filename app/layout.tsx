import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-right"  // Cambia la posición del toast
          reverseOrder={false}  // Para que los toasts nuevos se muestren arriba
          toastOptions={{
            // Personalización global para todos los toasts
            success: {
              duration: 3000,  // Duración del toast de éxito
              style: {
                background: 'green',  // Fondo verde para éxito
                color: 'white',  // Texto blanco
                fontWeight: 'bold',  // Negrita para el texto
              },
            },
            error: {
              duration: 5000,  // Duración del toast de error
              style: {
                background: 'red',  // Fondo rojo para error
                color: 'white',  // Texto blanco
                fontWeight: 'bold',  // Negrita para el texto
              },
            },
            loading: {
              duration: 2000,  // Duración del toast de carga
              style: {
                background: 'yellow',  // Fondo amarillo para loading
                color: 'black',  // Texto negro
                fontWeight: 'normal',  // Texto normal
              },
            },
          }}
        />
      </body>
    </html>
  );
}