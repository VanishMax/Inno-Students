import { withRouter } from 'next/router'
import Link from 'next/link'

function MyLink({ children, router, href }) {
  return (
    <Link prefetch href={{pathname: href, query: {...router.query}}}>
      {children}
    </Link>
  );
}

export default withRouter(MyLink)
