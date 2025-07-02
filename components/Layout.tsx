// components/Layout.tsx
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4">
        {children}
      </main>
    </div>
  );
}
