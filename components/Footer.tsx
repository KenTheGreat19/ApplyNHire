import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-[#0A66C2] mb-4">ApplyNHire</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              100% Free Job Portal. Find jobs. Hire talent. No fees. Ever.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/employer" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employer/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Applicants</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/applicant/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  My Applications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} ApplyNHire — Free Forever
        </div>
      </div>
    </footer>
  )
}
