import Link from 'next/link';

import { URL, URLSearchParams } from 'url';

import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

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

  const {
    data,
    message,
  } = await res.json()

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
  const {
    transaction: {
      status,
    },
    requests,
  } = data;

  const statusColor = {
    'error': 'red',
    'success': 'green',
  };

  const options = {
    autoResize: true,
    clickToUse: true,
    heightConstraint: {
      minimum: 20,
      valign: 'top',
    },
    layout: {
      hierarchical: {
        enabled: true,
        nodeSpacing: 20,
        direction: 'LR',
      }
    },
    edges: {
      color: "#000000"
    },
    nodes: {
      fixed: {
        x: true,
        y: true,
      },
    },
  };

  let nodesArray = [];
  let edgesArray = [];

  nodesArray.push({ id: 0, label: 'start', color: 'yellow' });
  edgesArray.push({ from: 0, to: 1 });

  requests.map((req, index) => {
    nodesArray.push({ id: index + 1, label: req.service, title: `node ${index} text!`, color: statusColor[req.status] });
    edgesArray.push({ from: index + 1, to: index + 2 });
  })

  nodesArray.push({ id: nodesArray.length, label: 'end', color: 'blue' });


  const events = {
    select: function(event) {
      const { nodes, edges } = event;
      alert('selected! ' + event);
    }
  };

  const graph = {
    nodes: nodesArray,
    edges: edgesArray,
  };

  console.log('graph', graph);

  return (
    <>
      <h1>Transaction</h1>
      <div>Transaction Status: {status}</div>
      <div>
        <Graph
          graph={graph}
          options={options}
          events={events}
          style={{ height: "300px" }}
        />
      </div>
      <h2>
        <Link href="/">
          <a>Back</a>
        </Link>
      </h2>
    </>
  )
}