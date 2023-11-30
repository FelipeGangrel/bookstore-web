import { Carousel } from '@/components/client-side'

export default function Home() {
  return (
    <main className="h-[2000px] bg-slate-300">
      <section className="bg-gray-900 pt-20">
        <Carousel>
          <div className="h-96 w-full shrink-0 bg-gray-100">Slide 1</div>
          <div className="h-96 w-full shrink-0 bg-gray-100">Slide 2</div>
          <div className="h-96 w-full shrink-0 bg-gray-100">Slide 3</div>
        </Carousel>
      </section>
    </main>
  )
}
