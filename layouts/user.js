import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import AdminNav from '../components/profile/adminNav'
import MainNav from '../components/profile/mainNav'
import Request from '../components/profile/requst'

export default ({ children, lang, img, role, goFromEdit, title, username }) => {

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
        {role === 'A' || role === 'E' ?
          <React.Fragment>
            <MainNav lang={lang} img={img} goFromEdit={goFromEdit} />

            <div className="flex flex-col items-center justify-center mt-16">
              { children }
            </div>

            { role === 'A' && <AdminNav lang={lang} /> }
          </React.Fragment>
        :
          <React.Fragment>
            <Request username={username} />
          </React.Fragment>
        }

      </div>
    </React.Fragment>

  )
}
