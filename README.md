# InnoStudents

v4 of the InnoStudents website.

## Structure
InnoStudents follows the microservice architecture. 
It is divided into 3 parts:
 - `main` section is written in Svelte (Sapper). Covers the
 news pages, tags and a single page. Will be used by
 unauthorized users.
 - `authors` section is written in React (Next). Covers
 the logic of roles: authors, groups of authors, moderators.
 They will be connected in writing articles.
 - `API` backend is written in Node.js. Covers endpoints,
 authentication and logic.
 - `frontend` will be deprecated in the v4.1 release.
 It is used only for demonstration purposes of the same app
 in previous design and the monolith architecture.

## Configuration

### Environment

You need to create .env file in the api and a frontend directory
with the following content:

```
MONGOURI=some_url_to_mongodb
COOKIEKEY=the_cookie_for_authentication
BUCKET=url_to_s3_public_bucket
```

### Build
Under implementation
