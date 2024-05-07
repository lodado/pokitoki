import { redirect } from 'next/navigation'

// This page only renders when the app is built statically (output: 'export')
export default function Page() {
  redirect('/protected/dashboard/stat')
}
