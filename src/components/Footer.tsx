export default function Footer() {
  return (
    <footer className="border-t mt-10 py-6 text-sm text-center text-gray-500">
      <p>
        Built by <span className="font-semibold">Wilker Vivas</span>
      </p>

      <div className="flex justify-center gap-4 mt-2">
        <a
         href="https://github.com/wilker31vivas"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800"
        >
          GitHub
        </a>

        <a
          href="https://br.linkedin.com/in/wilker-vivas-531965234"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800"
        >
          LinkedIn
        </a>

        <a
          href="mailto:wilker.vivas.31@email.com"
          className="hover:text-gray-800"
        >
          Email
        </a>
      </div>

      <p className="mt-3 text-xs">
        © {new Date().getFullYear()} Wilker Vivas. All rights reserved.
      </p>
    </footer>
  )
}