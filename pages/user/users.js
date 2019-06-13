import React, {useContext, useState} from 'react'
import 'isomorphic-unfetch'

import roles from '../../constants/roles'
import {LangContext} from '../../middleware/context'
import Layout from '../../layouts/user'
import withData from '../../middleware/HOCs/withData'
import {fakeUserImg, bucket} from '../../constants/user'
import UsersTable from '../../components/profile/usersTable'

const Users = ({users, user}) => {

  const lang = useContext(LangContext)

  const [role, changeRole] = useState(roles.find(x => x.value === user.role))

  return (
    <React.Fragment>
      <Layout lang={lang} title={'All your drafts'}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              isAdmin={user.role === "A"}>
        <UsersTable users={users} lang={lang} roles={roles} role={role} changeRole={changeRole}/>
      </Layout>
    </React.Fragment>
  )
}

export default withData(Users)
