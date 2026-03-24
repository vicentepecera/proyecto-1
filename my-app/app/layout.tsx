// app/layout.tsx o app/root-layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext"; // Ajusta path

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}