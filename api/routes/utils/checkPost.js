const checkPost = (post) => {
  const content = post.en.content ? JSON.parse(post.en.content) : '';
  const contentRu = post.ru.content ? JSON.parse(post.ru.content) : '';

  const data = {
    en: {
      title: post.en.title !== '',
      lead: post.en.lead !== '',
      content: content === '' ? false
        : !(content.blocks[0].type === 'unstyled' && content.blocks[0].text === ''),
    },
    ru: {
      title: post.ru.title !== '',
      lead: post.ru.lead !== '',
      content: contentRu === '' ? false
        : !(contentRu.blocks[0].type === 'unstyled' && contentRu.blocks[0].text === ''),
    },
    author: {
      en: {
        name: post.author.en.name !== '',
        surname: post.author.en.surname !== '',
      },
      ru: {
        name: post.author.ru.name !== '',
        surname: post.author.ru.surname !== '',
      },
      website: post.author.en.website !== '',
    },
    cover: post.img !== '',
  };

  const codes = []; let
    exclusive = '';
  if ((!data.en.title || !data.en.lead || !data.en.content)
    && (!data.ru.title || !data.ru.lead || !data.ru.content)) {
    codes.push(0);
  } else if (!data.en.title || !data.en.lead || !data.en.content) {
    codes.push(1);
    exclusive = 'ru';
  } else if (!data.ru.title || !data.ru.lead || !data.ru.content) {
    codes.push(2);
    exclusive = 'en';
  }
  if (!data.cover) codes.push(3);
  if ((!data.author.en.name || !data.author.en.surname)
    && (!data.author.ru.name || !data.author.ru.surname)) {
    codes.push(4);
  } else if (!data.author.en.name || !data.author.en.surname) {
    codes.push(5);
  } else if (!data.author.ru.name || !data.author.ru.surname) {
    codes.push(6);
  }
  if (!data.author.website) codes.push(7);

  return {
    codes, data, exclusive, author: post.author.username,
  };
};

module.exports = checkPost;
