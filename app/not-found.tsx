import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
