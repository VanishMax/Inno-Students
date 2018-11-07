import React from 'react'
import Header from '../Header'
import {Helmet} from "react-helmet"

export default function Home() {
  return (
    <div>
      <Header/>
      <Helmet>
        <title>Login - VaMax</title>
        <meta name="description" content="Login in VaMax app" />
      </Helmet>
    </div>
  )
}