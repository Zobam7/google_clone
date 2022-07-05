import React from 'react'
import Head from "next/head";
import Header from '../components/Header';
import Response from '../Response';
import { useRouter } from "next/router"
import SearchResults from './SearchResults';

function Search({ results}) {
    // console.log(results);
    const router = useRouter()
  return (
    <div>
        <Head>
            <title>{router.query.term} - Google Search</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <Header />
        <SearchResults results={results} />
    </div>
  )
}

export default Search

export async function getServerSideProps (context) {
    const API_KEY = process.env.API_KEY
    const CONTEXT_KEY = process.env.CONTEXT_KEY
    const useDummyData = false
    const startIndex = context.query.start || "0"

    const data =  await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`).then((resposne) => resposne
    .json())

    return {
        props : {
            results: data,
        }
    }
}