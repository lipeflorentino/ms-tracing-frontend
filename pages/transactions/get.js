import Link from 'next/link';

import { URL, URLSearchParams } from 'url';

export async function getServerSideProps({ query }) {
  const myHeaders = new Headers();

  const url = new URL(`https://he9svxn2x6.execute-api.us-east-1.amazonaws.com/dev/transactions`);

  url.search = new URLSearchParams(query).toString();

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  };

  const res = await fetch(url, myInit);

  const { data, message } = await res.json()

  console.log('message', message);

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export default function GetTransactionPage({ data }) {
  return (
    <>
      <h1>Transaction</h1>
      <div>
        {data &&
          Object
            .entries(data)
            .map((entry) => {
              const key = typeof entry[0] === 'string' ? entry[0] : JSON.stringify(entry[0]);
              const value = typeof entry[1] === 'string' ? entry[1] : JSON.stringify(entry[1]);
              return (
                <p key={key}><strong>{key.toUpperCase()}: </strong> {value}</p>
              )
          })
        }
      </div>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}