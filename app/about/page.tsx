import type { Metadata } from "next"
import Image from "next/image"
import { Eye, Heart, Target, BookOpen } from "lucide-react"
import HeroSection from "@/components/HeroSection"
import AnimatedSection from "@/components/AnimatedSection"
import KalawaTimeline from "@/components/KalawaTimeline"

export const metadata: Metadata = {
  title: "About Us - Sacred Samagri",
  description:
    "Learn about Sacred Samagri's journey of bringing authentic pooja products to devotees across India.",
}

const milestones = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Founded in the holy city of Varanasi with a small collection of handcrafted pooja items and a vision to serve devotees.",
  },
  {
    year: "2014",
    title: "Growing with Faith",
    description:
      "Expanded our product range to over 200 items, partnering with artisans from Rajasthan, Tamil Nadu, and West Bengal.",
  },
  {
    year: "2018",
    title: "Going Online",
    description:
      "Launched our online store to bring sacred essentials to devotees across India, reaching every state and union territory.",
  },
  {
    year: "2022",
    title: "Trusted by Thousands",
    description:
      "Serving over 50,000 satisfied customers with a commitment to quality, authenticity, and divine service.",
  },
  {
    year: "2025",
    title: "A Pan-India Brand",
    description:
      "Recognized as one of India's most trusted spiritual product brands, with same-day delivery in major cities.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Our Mission",
    description:
      "To make authentic, high-quality pooja samagri accessible to every devotee in India, preserving the sanctity and tradition of Hindu rituals.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become India's most trusted spiritual products brand, known for purity, craftsmanship, and deep respect for tradition.",
  },
  {
    icon: Target,
    title: "Our Values",
    description:
      "Authenticity, devotion, quality, and service form the pillars of everything we do. Each product carries our commitment to excellence.",
  },
  {
    icon: BookOpen,
    title: "Our Heritage",
    description:
      "Rooted in the ancient traditions of Varanasi, we draw inspiration from centuries of spiritual wisdom and craftsmanship.",
  },
]

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="Our Sacred Journey"
        subtitle="From the holy ghats of Varanasi to homes across India, our story is one of faith, tradition, and devotion."
      />

      {/* Story Section */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/about-store.jpg"
                  alt="Inside our traditional pooja products store"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Our Story
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                A Legacy of Faith and Devotion
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Sacred Samagri was born from a deep-rooted love for Indian spiritual traditions.
                What started as a small shop near the banks of the Ganges in Varanasi has grown
                into a trusted brand serving devotees across the nation.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our founder, inspired by the daily rituals performed at the ancient temples of
                Kashi, envisioned a place where every family could find pure, authentic pooja
                essentials. We work directly with temple artisans, brass workers, and farmers
                to bring you products that honor the sanctity of your worship.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every incense stick, every brass diya, and every grain of kumkum in our
                collection carries the blessing of tradition and the assurance of quality
                that you deserve.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              What Drives Us
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Our Guiding Principles
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 100}>
                <div className="flex gap-6 rounded-xl bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Kalawa / Raksha Sutra */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Timeline
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Milestones of Devotion
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Like the sacred kalawa (raksha sutra) tied to protect and bless, our journey
              is an unbroken thread of faith connecting every milestone with devotion.
            </p>
          </AnimatedSection>

          <div className="mt-14">
            <KalawaTimeline milestones={milestones} />
          </div>
        </div>
      </section>
    </>
  )
}
