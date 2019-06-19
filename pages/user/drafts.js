import React, {useContext} from 'react'

import {LangContext} from '../../middleware/context'
import Layout from '../../layouts/user'
import withData from '../../middleware/HOCs/withData'
import {fakeUserImg, bucket} from '../../constants/user'
import PostsTable from '../../components/post/postsTable'

const Drafts = ({posts, user}) => {

  const lang = useContext(LangContext)

  return (
    <React.Fragment>
      <Layout lang={lang} title={'Your Drafts'}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              user={user}>
        <PostsTable posts={posts} lang={lang} />
      </Layout>
    </React.Fragment>
  )
}

export default withData(Drafts)