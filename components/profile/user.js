import React from 'react'
import Lang from '../../langs/profile'

export default ({lang, user}) => {
  return (
    <React.Fragment>
      <div className="text-xl text-semibold mb-4 tracking-wider">Maxim @VanishMax Korsunov</div>
      <a
        href="https://instagram.com/vanishmax"
        className="text-lg italic hover:text-green-700 mb-4"
        target="_blank"
      >
        instagram.com/vanishmax
      </a>
      <div className="text-xl mb-6">
        {user.role === "A" ? Lang.admin[lang] : Lang.author[lang]}
      </div>
      <div className="border border-gray-900 cursor-pointer rounded shadow px-4 py-2 hover:border-green-700 hover:text-green-700">
        {Lang.edit[lang]}
      </div>
    </React.Fragment>
  )
}
