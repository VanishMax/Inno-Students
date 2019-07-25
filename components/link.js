import { useContext } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { LangContext } from '../middleware/context';

function MyLink({
  children, href, as = href, query, prefetch = false, text = false,
}) {
  const lang = useContext(LangContext);
  const langQuery = lang === 'ru' ? '?lang=ru' : '';

  return (
    <Link prefetch={prefetch} href={{ pathname: href, query: { ...query } }} as={as + langQuery}>
      {children}
    </Link>
  );
}

export default withRouter(MyLink);
