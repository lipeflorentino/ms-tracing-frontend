import Link from 'next/link'

export default function ListTransactionsPage() {
  return (
    <>
      <h1>Transactions List</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}