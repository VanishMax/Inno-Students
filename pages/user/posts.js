import React, {useContext} from 'react'

import {LangContext} from '../../middleware/context'
import Layout from '../../layouts/user'
import withData from '../../middleware/HOCs/withData'
import {fakeUserImg, bucket} from '../../constants/user'
import PostsTable from '../../components/post/postsTable'

const Posts = ({posts, user}) => {

  const lang = useContext(LangContext)

  return (
    <React.Fragment>
      <Layout lang={lang} title={'Your Posts'}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              user={user}>
        <PostsTable posts={posts} lang={lang} isPublished />
      </Layout>
    </React.Fragment>
  )
}

export default withData(Posts)
