import { FC, HTMLAttributes } from 'react'

import { Carousel } from '@/components/shared/client-side'

const Slide: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div
    {...props}
    className="flex h-[600px] w-full shrink-0 items-center justify-center text-white"
  >
    {children}
  </div>
)

export default function Home() {
  return (
    <>
      <section className="bg-gray-900">
        <div className="container mx-auto">
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
        </div>
      </section>
    </>
  )
}
