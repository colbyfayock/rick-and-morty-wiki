import { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data;

  const [page, updatePage] = useState({
    current: defaultEndpoint,
    next: info?.next
  });
  const { current } = page;

  const [results, updateResults] = useState(defaultResults);

  useEffect(() => {
    if ( current === defaultEndpoint ) return;

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();
      const { info: nextInfo, results: nextResults } = nextData;

      updatePage(prev => {
        return {
          ...prev,
          next: nextInfo?.next
        }
      });

      updateResults(prev => {
        return [
          ...prev,
          ...nextResults
        ]
      });
    }
    request();
  }, [current])

  function handleLoadMore() {
    updatePage(prev => {
      return {
        current: page?.next
      }
    });
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Wubba Lubba Dub Dub!
        </h1>

        <ul className="grid">
          {results.map(result => {
            const { id, name, image } = result;
            return (
              <li className="card" key={id}>
                <Link href="/character/[id]" as={`/character/${id}`}>
                  <a className="char">
                    <div className="char-thumb">
                      <img src={image} />
                    </div>
                    { name }
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {info?.next && (
          <p>
            <button onClick={handleLoadMore}>Load More</button>
          </p>
        )}


      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          list-style: none;

          max-width: 800px;
          padding: 0;
          margin-top: 3rem;
        }

        .card {
          display: block;
          flex-shrink: 1;
          width: 30%;
          margin: 1.5%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .card img {
          width: 100%;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }


      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
