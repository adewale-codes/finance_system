import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-white px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-widest text-stone-400 uppercase">
            Financial Operating System
          </p>
          <h1 className="text-6xl font-bold tracking-tight">Finops</h1>
        </div>

        <p className="text-xl text-stone-300 leading-relaxed">
          Most people live in financial confusion. Finops gives you total clarity —
          your true financial reality, a personalised operating system, and the mindset
          shift to make it stick.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/register"
            className="inline-block bg-white text-stone-950 font-semibold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors w-full sm:w-auto"
          >
            Begin your reality check
          </Link>
          <Link
            href="/login"
            className="inline-block border border-stone-600 text-stone-300 font-semibold px-8 py-4 rounded-full hover:border-stone-400 hover:text-white transition-colors w-full sm:w-auto"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </main>
  )
}
