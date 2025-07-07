import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-blue-900">
        <Sidebar />
        <main className="ml-64 min-h-screen p-6">
          {children}
        </main>
      </body>
    </html>
  );
}