/* eslint-disable @next/next/no-img-element */

export default function Footer() {
  return (
    <div className="mt-12 mb-32">
      <a
        className="fixed bottom-0 right-0 bg-base-100 py-2 px-4 z-[100] cursor-pointer rounded-tl-lg border-gray-400 border-t border-l border-dashed text-sm font-semibold opacity-95 hover:bg-base-200 hover:opacity-100 hover:border-solid duration-200 group"
        href="https://linkedin.com/in/ege-okyay"
        target="_blank"
      >
        <div className="flex flex-row justify-center items-center text-center gap-1">
          By
          <span className="link link-primary">Ege</span>
          <div className="avatar -mt-1 -mb-1">
            <div className="relative w-7 rounded-full">
              {/* Profile picture */}
              <img src="https://avatars.githubusercontent.com/u/83663983?v=4" alt="Profile picture" />
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
