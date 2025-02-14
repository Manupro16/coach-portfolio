import WelcomeSection from '@/app/components/home/WelcomeSection';
import ShowcaseSection from '@/app/components/home/ShowcaseSection';
import {Grid} from "@radix-ui/themes";

function Home() {
    return (
        <Grid as='div' columns='1' rows='auto auto'>
            <section className="relative">
                <WelcomeSection/>
            </section>
            <section className="relative">
                <ShowcaseSection/>
            </section>
        </Grid>
    )
}

export default Home;