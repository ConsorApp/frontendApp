
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="min-h-screen bg-slate-100 p-6 flex justify-center">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </main>
      );
}
