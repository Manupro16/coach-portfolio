import Image from "next/image";
import { Flex, Heading, Quote, Text, Box } from "@radix-ui/themes";

// your three hero photos
const heroPics = [
  "/pic/ChuySoccerPlayer.jpg",
  "/pic/chuyVeraDallasCup.jpg",
  "/pic/jesus-vera-070219.jpg",
];

export default function AboutSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ─── DIM OVERLAY: keeps text readable ─── */}
      <Box className="absolute inset-0 bg-black/50 -z-10" />

      {/* ─── THREE-COL GRID WITH INVERTED-V EDGES ─── */}
      <div className="absolute inset-0 grid grid-cols-3 -z-20">
        {heroPics.map((src, idx) => (
          <div
            key={src}
            /* pick the correct clip class for each column */
            className={[
              "relative",
              idx === 0 && "clip-left",
              idx === 1 && "clip-mid border-l border-white/90",
              idx === 2 && "clip-right border-l border-white/90",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width:768px) 33vw, 33vw"
              className={`object-cover ${idx === 1 ? "brightness-50" : "brightness-90"}`}
              priority
            />
          </div>
        ))}
      </div>

      {/* ─── FOREGROUND COPY (your earlier markup) ─── */}
      <Flex direction="column" align="center" className="px-4 py-14 md:py-24">
        <Heading as="h1" size="8" className="mb-1 text-primary-foreground">
          José&nbsp;de&nbsp;Jesús&nbsp;Vera
        </Heading>

        <Quote  className="mb-2">
          “El&nbsp;Chuy” Vera
        </Quote>

        <Box
          as="span"
          className="block h-[3px] w-1/3 bg-primary motion-safe:animate-[grow_1.2s_ease-out]"
        />

        <Text align="center" className="mt-4 max-w-[60ch] leading-relaxed">
          Former professional player turned coach with&nbsp;
          <strong>9&nbsp;years of pro-level coaching</strong>. <br />
          Currently guiding the next generation as an&nbsp;
          <strong>MLS NEXT Academy coach at FC Dallas</strong>.
        </Text>
             <Text
          as="p"
          align="center"
          className="mt-6 max-w-[65ch] text-balance mx-auto leading-relaxed"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
          pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
          aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
        </Text>

        {/* …Longer bio paragraph here… */}
      </Flex>
    </section>
  );
}

