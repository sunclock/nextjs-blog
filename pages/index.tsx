import type { ReactElement } from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import NestedLayout, { siteTitle } from '../components/nested-layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <Link href="/posts/first-post">
          <a>First Post</a>
        </Link>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout home>{page}</NestedLayout>
    </Layout>
  )
}

// getStaticProps only runs on the server-side. 
// It will never run on the client - side.It won’t even be included in the JS bundle for the browser.
// That means you can write code such as direct database queries without them being sent to browsers.

// In development (npm run dev or yarn dev), getStaticProps runs on every request.
// In production, getStaticProps runs at build time.

// getStaticProps can only be exported from a page. 
// One of the reasons for this restriction is that React needs to have all the required data before the page is rendered. 

// If you need to get data from the server, you can use getInitialProps.
// You can use getStaticPaths to fetch data for multiple pages.

// STATIC GENERATION
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
// SERVER-SIDE RENDERING
// Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.
// You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. 
// Time to first byte(TTFB) will be slower than getStaticProps because the server must compute the result on every request, 
// and the result cannot be cached by a CDN without extra configuration.
// export async function getServerSideProps(context) {
//   return {
//     props: {

//     }
//   }
// }

// CLIENT-SIDE RENDERING
// If you do not need to pre - render the data, you can also use the following strategy(called Client - side Rendering):
// The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side.
// It handles caching, revalidation, focus tracking, refetching on interval, and more. 
// This approach works well for user dashboard pages, for example. 
// Because a dashboard is a private, user - specific page, SEO is not relevant, 
// and the page doesn’t need to be pre - rendered.The data is frequently updated, which requires request - time data fetching.
// 1. Statically generate (pre-render) parts of the page that do not require external data.
// 2. When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

// import useSWR from 'swr'
// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }