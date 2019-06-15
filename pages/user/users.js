import React, {useContext} from 'react'

import {LangContext} from '../../middleware/context'
import Layout from '../../layouts/user'
import withData from '../../middleware/HOCs/withData'
import {fakeUserImg, bucket} from '../../constants/user'
import UsersTable from '../../components/profile/usersTable'

const Users = ({users, user}) => {

  const lang = useContext(LangContext)

  return (
    <React.Fragment>
      <Layout lang={lang} title={'All your drafts'}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              user={user}>
        <UsersTable users={users} lang={lang}/>
      </Layout>
    </React.Fragment>
  )
}

export default withData(Users)
