import Link from 'next/link'

import { URL, URLSearchParams } from 'url';

import moment from 'moment';

export async function getServerSideProps(context) {
  const myHeaders = new Headers();

  const url = new URL(`https://he9svxn2x6.execute-api.us-east-1.amazonaws.com/dev/transactions`);

  url.search = new URLSearchParams({ index: 'createdAt', param: moment().format("YYYY-MM-DD") }).toString();

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

export default function ListTransactionsPage({ data }) {
  console.log('DATA', data);
  return (
    <>
      <h1>Transactions List</h1>
      <table>
        <thead>
          <tr>
              <th>Name</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
          </tr>
        </tbody>
      </table>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}