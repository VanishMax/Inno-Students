import passport from 'passport'
export default function (app){

  //Send request to Google with Passport google-strategy
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/')
    }
  )

  //Delete User's session - logOut
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post('/auth/isAdmin', (req, res) => {
    let isAdmin = false
    if(req.user) {
      if (req.user.isAdmin !== undefined)  {
        if(req.user.isAdmin === true){
          isAdmin = true
        }
      }
    }
    res.send({isAdmin: isAdmin})
  })
}