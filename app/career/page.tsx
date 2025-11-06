import {Grid} from "@radix-ui/themes";
import StatisticStructure from "@/app/career/components/statisticStructure";


export default function CareerPageSection() {
  return (
    <section className="relative isolate overflow-hidden">
        <Grid as="div" columns="1" rows={{ initial: "1fr 1fr" }} >
            <StatisticStructure />
        </Grid>
    </section>
  )
}
