import App from 'next/app'
import Head from 'next/head'

import 'marx-css/css/marx.css'
import '@/styles/app.css'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Next example for Remark42</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
