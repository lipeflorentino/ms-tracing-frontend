import Link from 'next/link'

export default function Transaction() {
  return (
    <>
      <h1>Transactions</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}