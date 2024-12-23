export default function Brands() {
  return (
    <div className="bg-purple-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          <div className="bg-white/5 p-8 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/transistor-logo-white.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
          </div>
          <div className="bg-white/5 p-6 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/reform-logo-white.svg"
              alt="Reform"
              width={158}
              height={48}
            />
          </div>
          <div className="bg-white/5 p-6 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/tuple-logo-white.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
          </div>
          <div className="bg-white/5 p-6 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/laravel-logo-white.svg"
              alt="Laravel"
              width={158}
              height={48}
            />
          </div>
          <div className="bg-white/5 p-6 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/savvycal-logo-white.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
          </div>
          <div className="bg-white/5 p-6 sm:p-10">
            <img
              className="max-h-12 w-full object-contain"
              src="/statamic-logo-white.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
