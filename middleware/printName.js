export default (lang, author) => (
  author[lang].name ? `${author[lang].name} ${author[lang].surname}` : author.username
);
