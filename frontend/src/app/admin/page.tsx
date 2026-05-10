// TODO: add server-side admin auth guard via middleware
// TODO: fetch real stats from GET /admin/stats

const placeholderStats = {
  totalUsers: 0,
  activeUsers7d: 0,
  journeysCompleted: 0,
  checkinsToday: 0,
}

const placeholderUsers: { id: string; email: string; createdAt: string; journeyCompleted: boolean }[] = []

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-white">
      <nav className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <p className="font-bold">Finops Admin</p>
        <p className="text-sm text-stone-500">Protected</p>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: placeholderStats.totalUsers },
            { label: 'Active (7d)', value: placeholderStats.activeUsers7d },
            { label: 'Journeys Completed', value: placeholderStats.journeysCompleted },
            { label: "Check-Ins Today", value: placeholderStats.checkinsToday },
          ].map((stat) => (
            <div key={stat.label} className="bg-stone-900 rounded-xl p-5">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="space-y-4">
          <h2 className="font-semibold">Users</h2>
          {placeholderUsers.length === 0 ? (
            <div className="bg-stone-900 rounded-xl p-8 text-center text-stone-500">
              No users yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-stone-500 text-left border-b border-stone-800">
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Journey</th>
                </tr>
              </thead>
              <tbody>
                {placeholderUsers.map((user) => (
                  <tr key={user.id} className="border-b border-stone-900">
                    <td className="py-3">{user.email}</td>
                    <td className="py-3 text-stone-500">{user.createdAt}</td>
                    <td className="py-3">
                      {user.journeyCompleted ? (
                        <span className="text-green-400">Complete</span>
                      ) : (
                        <span className="text-stone-500">In progress</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
