'use client'

import type { CustomFlowbiteTheme } from 'flowbite-react'
import { Carousel } from 'flowbite-react'
import Image from 'next/image'
import type { FC, HTMLAttributes } from 'react'

import { Button } from '@/components/client-side'

const themeStyles = {
  scrollContainer: {
    base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none',
    snap: 'snap-x',
  },
  control: {
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 group-hover:bg-gray-900/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    icon: 'h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6',
  },
  indicators: {
    active: {
      off: 'bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800',
      on: 'bg-white dark:bg-gray-800',
    },
    base: 'h-3 w-3 rounded-full',
    wrapper:
      'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3 bg-gray-900 px-4 py-2 rounded-lg',
  },
} satisfies CustomFlowbiteTheme['carousel']

type SlideProps = HTMLAttributes<HTMLDivElement>

const Slide: FC<SlideProps> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center gap-4 text-white">
      {children}
    </div>
  )
}

export const FeaturedCarousel = () => {
  return (
    <div className="mx-auto my-0 h-[600px] w-full max-w-6xl bg-gray-900">
      <Carousel
        theme={themeStyles}
        leftControl={<></>}
        rightControl={<></>}
        pauseOnHover
        slideInterval={1000 * 60}
      >
        <Slide>
          <h2 className="text-2xl">Slide 1</h2>
          <p className="text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            laudantium odit rerum at velit aspernatur veritatis minima eum ut
            quae?
          </p>
          <p>
            <Button>Button</Button>
          </p>
        </Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
        <Slide>Slide 4</Slide>
        <Slide>Slide 5</Slide>
      </Carousel>
    </div>
  )
}
