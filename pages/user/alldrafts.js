import React, {useContext} from 'react'
import 'isomorphic-unfetch'

import {LangContext} from '../../middleware/context'
import Layout from '../../layouts/user'
import withPost from '../../middleware/HOCs/withPost'
import {fakeUserImg, bucket} from '../../constants/user'

const NewPost = ({posts, user}) => {

  const lang = useContext(LangContext)
  console.log(posts)

  return (
    <React.Fragment>
      <Layout lang={lang} title={'All your drafts'}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              isAdmin={user.role === "A"}>
      </Layout>
    </React.Fragment>
  )
}

export default withPost(NewPost)
