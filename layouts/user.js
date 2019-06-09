import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import AdminNav from '../components/profile/adminNav'
import MainNav from '../components/profile/mainNav'

export default ({ children, lang, img, isAdmin, goFromEdit, title }) => {

  if(!goFromEdit) {
    goFromEdit = () => {
      Router.replace({ pathname: '/user', query: { ...Router.query }})
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{title} | InnoStudents</title>
      </Head>
      <div className="app mt-10">
        <MainNav lang={lang} img={img} goFromEdit={goFromEdit} />

        <div className="flex flex-col items-center justify-center mt-16">
          { children }
        </div>

        { isAdmin && <AdminNav lang={lang} /> }
      </div>
    </React.Fragment>

  )
}
