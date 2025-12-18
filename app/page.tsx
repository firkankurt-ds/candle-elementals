import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">Scientific Creativity</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Hand-poured with science and love. We create natural, phthalate-free, and paraffin-free soy candles that bring Istanbul's elemental beauty into your space.
          </p>
          <a href="/about" className="text-primary hover:underline underline-offset-4 text-sm font-medium uppercase tracking-widest">
            Read Our Story
          </a>

          <Highlights />
        </div>
      </section>
    </>
  );
}
