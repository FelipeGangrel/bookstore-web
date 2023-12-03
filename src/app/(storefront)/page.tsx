import { FC, HTMLAttributes } from 'react'

import { Carousel } from '@/components/client-side'

const Slide: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    {...props}
    className="flex h-96 w-full shrink-0 items-center justify-center bg-gray-800 text-white"
  >
    {children}
  </div>
)

export default function Home() {
  return (
    <div className="bg-slate-300">
      <section className="bg-gray-900">
        <Carousel autoSlide autoSlideInterval={5000}>
          <Slide>
            <h1 className="text-6xl font-bold text-yellow-300">Slide 1</h1>
          </Slide>
          <Slide>
            <h1 className="text-6xl font-bold text-blue-300">Slide 2</h1>
          </Slide>
          <Slide>
            <h1 className="text-6xl font-bold text-pink-300">Slide 3</h1>
          </Slide>
        </Carousel>
      </section>
    </div>
  )
}
