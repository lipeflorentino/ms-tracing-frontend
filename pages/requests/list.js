import Link from 'next/link'

import { URL, URLSearchParams } from 'url';

import moment from 'moment';

export const getServerSideProps = async ({  }) => {
    // const state = store.getState();

    const myHeaders = new Headers();

    const url = new URL(`https://he9svxn2x6.execute-api.us-east-1.amazonaws.com/dev/requests/list`);

    url.search = new URLSearchParams({ index: 'status', param: 'error' }).toString();

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };

    const res = await fetch(url, myInit);

    console.log('RES', res);

    const {
      data: {
        requests,
      },
      message,
    } = await res.json();

    // store.dispatch(postsUpdateList(posts.slice(0, postsPerPage)));

    console.log('message', { message, requests });

    if (!requests) {
      return {
        notFound: true,
      }
    }

    return {
      props: { requests }, // will be passed to the page component as props
    }
};

export default function ListRequestsPage({ requests }) {
  console.log('REQUESTS', requests);
  return (
    <>
      <h1>Requests List</h1>
      <table>
        <thead>
          <tr>
              <th>Id</th>
              <th>CreatedAt</th>
              <th>Service</th>
              <th>TransactionId</th>
              <th>type</th>
              <th>Status</th>
          </tr>
        </thead>

        <tbody>
            {
              requests &&
              requests.map(({ requestId, transactionId, type, errorTrace, service, elapsedTime, status }) => {
                  return (
                    <tr key={requestId}>
                      <td className='any'>
                        <Link href={{ pathname: "/requests/get", query: { requestId } }}>
                          <a>{requestId}</a>
                        </Link>
                      </td>
                      <td>{(new Date(elapsedTime)).toISOString()}</td>
                      <td>{service}</td>
                      <td>{transactionId}</td>
                      <td>{type}</td>
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