export default async function IndexPage() {
  return (
    <>
      Welcome to World System! This is the landing page.
      {/* {session ? (
        <>
          {session.user?.image}
          <img src={session.user?.image || ''} />
          <p className="text-black">{session.user?.name}</p> <br />
          <button className="text-black" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <>Not logged in. log in...</>
      )} */}
    </>
  )
}
