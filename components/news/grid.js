import React, {useState} from 'react'
import 'isomorphic-unfetch'

import NewsCard from './card'
import LoadMore from '../icons/loadMore'

export default ({posts, lang}) => {

  let manyPosts = posts
  const limit = 6
  const [offset, editOffset] = useState(limit)
  const [showMore, changeShow] = useState(true)

  const loadPosts = async () => {
    const data = await fetch('/',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({limit: limit, offset: offset})
    }).then(res => res.json())
    manyPosts = manyPosts.concat(data.posts)

    if(data.posts.length < limit) changeShow(false)
    editOffset(offset + limit)
  }

  return (
    <div className="news-grid">
      {manyPosts.length === 0 ?
        <div className="text-lg leading-loose text-center">
          {lang === 'en' ? 'No posts found' : 'Нет подходящих публикаций'} :(
        </div>
      :
        <React.Fragment>
          <div className="news-grid-row md:flex-row flex-col">
            {manyPosts.map((post, i) => (
              <NewsCard key={i} big={i % 3 === 0} lang={lang} news={post} last={i % 3 === 2 || i % 3 === 0} />
            ))}
          </div>

          {showMore &&
          <div onClick={loadPosts} className="flex flex-col justify-center items-center h-40 w-full cursor-pointer hover:text-gray-800">
            <LoadMore width={30} height={25} />
            <span className="text-sm leading-relaxed">{lang === 'en' ? 'Load more' : 'Загрузить еще'}</span>
          </div>
          }
        </React.Fragment>
      }

    </div>
  )
}
