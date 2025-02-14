import WelcomeSection from '@/app/components/home/WelcomeSection';
import ShowcaseSection from '@/app/components/home/ShowcaseSection';

function Home() {
  return (
    <>
      <section className="relative" >
        <WelcomeSection />
      </section>
      <section className="relative">
        <ShowcaseSection />
      </section>
    </>
  )
}

export default Home;