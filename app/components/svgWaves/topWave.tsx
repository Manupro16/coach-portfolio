// app/components/svgWaves/TopWave.tsx
'use client';

import React from 'react';
import useGsapWaveAnimation from '@/app/hooks/useGsapWaveAnimation';
import {Box} from "@radix-ui/themes";


export default function TopWave() {
  // Define the animation configuration for the top wave
  const animations = [
    {
      targetId: 'wavePathTop',
      duration: 25,
      repeat: -1,
      paths: [
        'M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
        'M0,140L48,150C96,160,192,182,288,192C384,202,480,202,576,186C672,170,768,138,864,122C960,106,1056,106,1152,138C1248,170,1344,234,1392,266L1440,298L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
        'M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
      ],
    },
  ];

  // Trigger GSAP animations
  useGsapWaveAnimation(animations);

  return (
    <Box className="absolute w-full h-full">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-full fill-current text-primaryDark opacity-30"
        preserveAspectRatio="none"
      >
        <path id="wavePathTop" d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
    </Box>
  );
}

