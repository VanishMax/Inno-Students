import Link from '../../components/Link'

export default function Login() {
  return(
    <div className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
      <h1 className="title italic">Sign Up</h1>
      <div className="w-full mt-8 p-4 rounded shadow-lg">

        <h3 className="mb-4 text-center text-lg text-base text-gray-800">Please, provide your info</h3>
        <form className="w-full max-w-sm mx-auto">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                     htmlFor="inline-full-name">
                Username
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="inline-full-name" type="text" placeholder="Nickname12"/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                     htmlFor="inline-password">
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="inline-password" type="password" placeholder="**********"/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                     htmlFor="inline-confirm">
                Confirm Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="inline-confirm" type="password" placeholder="**********"/>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 text-center text-lg text-gray-800">
        <h3 className="">Already have an account?</h3>
        <Link href="/user/login">
          <a className="hover:text-green-600">Log In</a>
        </Link>
      </div>
    </div>
  )
}