import {useContext} from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import {LangContext} from '../middleware/context'

function MyLink({ children, href, as = href, query, prefetch = false, text = false }) {
  // for(let x of ['lang']) {
  //   if(router.query[x]) query[x] = router.query[x]
  // }

  const lang = useContext(LangContext)
  let langQuery = lang === 'ru' ? '?lang=ru' : ''

  return (
    <Link prefetch={prefetch} href={{pathname: href, query: {...query}}} as={as + langQuery}>
      {children}
    </Link>
  );
}

export default withRouter(MyLink)
