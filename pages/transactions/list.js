import Link from 'next/link'

import { URL, URLSearchParams } from 'url';

import moment from 'moment';

export const getServerSideProps = async ({  }) => {
    // const state = store.getState();

    const myHeaders = new Headers();

    const url = new URL(`https://he9svxn2x6.execute-api.us-east-1.amazonaws.com/dev/transactions/list`);

    url.search = new URLSearchParams({ index: 'createdAt', param: '2021-08-30' }).toString();

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };

    const res = await fetch(url, myInit);

    const {
      data: {
        transactions,
      },
      message,
    } = await res.json();

    // store.dispatch(postsUpdateList(posts.slice(0, postsPerPage)));

    console.log('message', { message, transactions });

    if (!transactions) {
      return {
        notFound: true,
      }
    }

    return {
      props: { transactions }, // will be passed to the page component as props
    }
};

export default function ListTransactionsPage({ transactions }) {
  return (
    <>
      <h1>Transactions List</h1>
      <table>
        <thead>
          <tr>
              <th>Id</th>
              <th>CreatedAt</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
            {
              transactions &&
                transactions.map(({ transactionId, elapsedTime, status }) => {
                  return (
                    <tr key={transactionId}>
                      <td>
                      <Link href={{ pathname: "/transactions/get", query: { transactionId } }}>
                        <a>{transactionId}</a>
                      </Link>
                      </td>
                      <td>{(new Date(elapsedTime)).toISOString()}</td>
                      <td className={'status-color--'+ status}>{status}</td>
                    </tr>
                  )
                })
            }
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