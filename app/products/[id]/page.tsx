import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, MessageCircle, ArrowLeft, Package, Clock, Shield, Leaf } from "lucide-react"
import { products } from "@/lib/products"
import ProductCard from "@/components/ProductCard"
import AnimatedSection from "@/components/AnimatedSection"

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: "Product Not Found" }
  return {
    title: `${product.name} - Sacred Samagri`,
    description: product.description,
  }
}

const features = [
  "100% authentic and natural materials",
  "Handcrafted by traditional artisans",
  "Quality checked before shipping",
  "Eco-friendly packaging",
  "Suitable for daily pooja and festivals",
]

const benefits = [
  {
    icon: Package,
    title: "Free Shipping",
    description: "On orders above ₹500"
  },
  {
    icon: Clock,
    title: "Delivery in 3-5 Days",
    description: "Pan India delivery"
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "100% authentic products"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable packaging"
  }
]

const reviews = [
  {
    name: "Anita Verma",
    text: "Excellent quality! The craftsmanship is truly divine. I use it every day for my morning pooja.",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    text: "Very happy with the product. Authentic and beautifully made. Will order again for sure.",
    rating: 5,
  },
  {
    name: "Lakshmi Iyer",
    text: "Packaging was excellent and delivery was fast. The product exceeded my expectations in quality.",
    rating: 4,
  },
]

// Helper function to format WhatsApp message with rich details
function formatWhatsAppMessage(product: any) {
  const message = `
*🙏 Namaste! I'm interested in purchasing:*

━━━━━━━━━━━━━━━━━━━━━━
*🛍️ PRODUCT DETAILS*
━━━━━━━━━━━━━━━━━━━━━━
*📿 Product:* ${product.name}
*🏷️ Category:* ${product.category.replace("-", " ").toUpperCase()}
*💰 Price:* ₹${product.price.toLocaleString("en-IN")}
*📝 Description:* ${product.description}

━━━━━━━━━━━━━━━━━━━━━━
*✨ KEY FEATURES*
━━━━━━━━━━━━━━━━━━━━━━
${features.map(f => `✓ ${f}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━
*📦 ORDER DETAILS*
━━━━━━━━━━━━━━━━━━━━━━

*Quantity Required:* [Please specify]

━━━━━━━━━━━━━━━━━━━━━━
*👤 CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━━━

*Full Name:* 
*Phone Number:* 
*Delivery Address:* 
*Pincode:* 
*City:* 
*State:* 

━━━━━━━━━━━━━━━━━━━━━━
*⚡ ADDITIONAL NOTES*
━━━━━━━━━━━━━━━━━━━━━━

*Preferred Payment:* [ ] UPI  [ ] Bank Transfer  [ ] Cash on Delivery
*Special Instructions:* 

━━━━━━━━━━━━━━━━━━━━━━
*🚚 DELIVERY INFO*
━━━━━━━━━━━━━━━━━━━━━━
✓ Free shipping on orders above ₹500
✓ Estimated delivery: 3-5 business days
✓ Pan India delivery available
✓ Eco-friendly packaging

━━━━━━━━━━━━━━━━━━━━━━
Thank you! I look forward to your response. 🙏
  `.trim()
  
  return encodeURIComponent(message)
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) notFound()

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  // If not enough related products in same category, fill with others
  const moreProducts =
    relatedProducts.length < 3
      ? [
          ...relatedProducts,
          ...products
            .filter(
              (p) =>
                p.id !== product.id &&
                !relatedProducts.find((r) => r.id === p.id)
            )
            .slice(0, 3 - relatedProducts.length),
        ]
      : relatedProducts

  const whatsappUrl = `https://wa.me/918840403939?text=${formatWhatsAppMessage(product)}`

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-secondary/90 py-12 md:py-16 relative overflow-hidden">
        {/* Decorative lotus pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-saffron)] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-deep-maroon)] rounded-full blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-sandal)] hover:text-primary transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          
          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
              {product.category.replace("-", " ").toUpperCase()}
            </span>
            <span className="text-[var(--color-sandal)]/60">|</span>
            <span className="text-[var(--color-sandal)]/80 text-sm">Sacred Samagri</span>
          </div>
          
          <h1 className="mt-4 animate-fade-in-up font-serif text-4xl font-bold text-[var(--color-sandal)] md:text-5xl lg:text-6xl max-w-3xl leading-tight">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Product detail */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Image with decorative frame */}
            <AnimatedSection>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-deep-maroon)] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur" />
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-[var(--color-deep-maroon)]/20 shadow-lg bg-card">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection delay={150}>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  {product.name}
                </h2>
                
                {/* Price with decorative elements */}
                <div className="mt-4 flex items-baseline gap-3">
                  <p className="text-4xl font-bold text-secondary">
                    {"₹"}{product.price.toLocaleString("en-IN")}
                  </p>
                  <span className="text-sm text-muted-foreground line-through">
                    {"₹"}{(product.price * 1.2).toFixed(0)}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    20% OFF
                  </span>
                </div>

                {/* Short description */}
                <p className="mt-6 text-lg leading-relaxed text-foreground border-l-4 border-[var(--color-saffron)] pl-4 italic">
                  {product.description}
                </p>

                {/* Features with icons */}
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-foreground bg-muted/30 p-3 rounded-lg"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits grid */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="text-xs font-semibold text-foreground">{benefit.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button className="flex-1 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:scale-105 active:scale-95">
                    Add to Cart
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] px-8 py-4 font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white group"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:animate-bounce" />
                    Order on WhatsApp
                  </a>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>✓ Secure Payment</span>
                  <span>✓ Free Shipping*</span>
                  <span>✓ Easy Returns</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gradient-to-b from-muted to-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatedSection className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Reviews
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              What Customers Say
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have experienced the divine quality of our products
            </p>
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reviews.map((review, i) => (
              <AnimatedSection key={review.name} delay={i * 100}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg
                        key={j}
                        className={`h-4 w-4 ${j < review.rating ? 'fill-primary text-primary' : 'fill-gray-300 text-gray-300'}`}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">
                    {`"${review.text}"`}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.name}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Related products */}
      {moreProducts.length > 0 && (
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AnimatedSection className="text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                You May Also Like
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
                Related Products
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Explore more sacred items from our collection
              </p>
            </AnimatedSection>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {moreProducts.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 100}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}