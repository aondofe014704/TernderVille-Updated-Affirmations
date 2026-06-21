export default function AdminHeader({ user }: { user: { name: string } }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="lg:ml-0 ml-12">
        <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
      </div>
      <div className="text-sm text-gray-600 hidden sm:block">
        Welcome, <span className="font-medium text-gray-900">{user.name}</span>
      </div>
    </header>
  );
}
