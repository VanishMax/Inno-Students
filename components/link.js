import { withRouter } from 'next/router'
import Link from 'next/link'

function MyLink({ children, router, href, noPrefetch = false }) {
  let query = {}
  for(let x of ['lang']) {
    if(router.query[x]) query[x] = router.query[x]
  }

  return (
    <Link prefetch={!noPrefetch} href={{pathname: href, query: {...query}}}>
      {children}
    </Link>
  );
}

export default withRouter(MyLink)
