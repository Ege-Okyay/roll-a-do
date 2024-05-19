import Image from "next/image";

export default function Navbar() {
  return (
    <div className="mt-4 navbar bg-base-100 rounded-box shadow-lg mx-auto max-w-xl mb-6">
      {/* Empty navbar start for potential future items */}
      <div className="navbar-start"></div>

      {/* Centered logo and title */}
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-lg" href="/">
          <span className="relative aspect-square w-8">
            {/* Logo image */}
            <Image alt="Roll a Do logo" src="/logo.svg" layout="fill" objectFit="contain" />
          </span>
          <span className="font font-bold opacity-80 tracking-tight ml-2">Roll a Do</span>
        </a>
      </div>

      {/* Empty navbar end for potential future items */}
      <div className="navbar-end"></div>
    </div>
  )
}
