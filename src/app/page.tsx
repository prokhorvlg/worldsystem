import Article from '@/components/Article'
import { LandingHeader } from '@/components/home/LandingHeader'
import { LandingHero } from '@/components/home/LandingHero'

export default async function IndexPage() {
  return (
    <>
      <LandingHeader />
      <Article>
        <LandingHero />
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
      </Article>
    </>
  )
}
