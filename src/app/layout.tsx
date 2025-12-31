import "./globals.css";
// 引入你的 AuthProvider 或其他 Context
import Providers from "@/src/app/providers"; 

export const metadata = {
  title: "My Website",
  description: "Official Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}