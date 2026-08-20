import { Check } from 'lucide-react'

const ManagerPage = () => {
  return (
    <div>
          <section className="border-t border-[#dedee8] bg-[#f0efff] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#6654d9]">
              For employees and managers
            </p>
            <h2 className="mt-5 font-serif text-6xl leading-[.88] tracking-[-.06em]">
              Useful for the person learning. Valuable for the person leading.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#6654d9]">
                Employees
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "Know the next step",
                  "Practice a real decision",
                  "Keep a personal record",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <Check size={15} className="text-[#3f8a5b]" /> {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-[#ffc96b] p-6">
              <p className="text-xs font-black uppercase tracking-[.18em] text-[#20243a]/60">
                Managers
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "See progress clearly",
                  "Receive completion records",
                  "Spot reinforcement needs",
                ].map((item) => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <Check size={15} /> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ManagerPage
