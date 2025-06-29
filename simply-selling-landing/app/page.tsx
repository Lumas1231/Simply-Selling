"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  CheckCircle,
  Camera,
  ShieldCheck,
  UserCheck,
  Settings,
  Network,
  Award,
  Mountain,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react"
import { HowItWorksStep, steps } from "@/components/how-it-works-step"

export default function LandingPage() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const heroTexts = ["Sell Your Home Without Paying Commissions", "Your Home • Your Sale • Your Profit"]
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [lockedStep, setLockedStep] = useState(-1) // -1 means no step is locked

  // Add mobile detection and enhanced scroll handling
  const [isMobile, setIsMobile] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length)
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("how-it-works")
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const windowHeight = window.innerHeight

      // Enhanced mobile scroll sensitivity
      const scrollSensitivity = isMobile ? 0.8 : 1
      const totalProgress = Math.max(0, Math.min(1, (-sectionTop / (sectionHeight - windowHeight)) * scrollSensitivity))

      setScrollProgress(totalProgress)

      const stepFloat = totalProgress * 6
      const activeStep = Math.floor(stepFloat)
      const stepProgress = stepFloat - activeStep

      setCurrentStep(activeStep)

      // Enhanced mobile-friendly locking logic
      const lockThreshold = isMobile ? { min: 0.2, max: 0.8 } : { min: 0.15, max: 0.85 }
      if (stepProgress >= lockThreshold.min && stepProgress <= lockThreshold.max) {
        setLockedStep(activeStep)
      } else {
        setLockedStep(-1)
      }
    }

    // Enhanced touch handling for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isMobile) return

      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      // Smooth scroll on mobile with momentum
      if (Math.abs(deltaY) > 10) {
        window.scrollBy({
          top: deltaY * 0.5,
          behavior: "smooth",
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: true })
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [isMobile, touchStartY])

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sky-white text-charcoal">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-charcoal-200">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Mountain className="h-6 w-6 text-fresh-green" />
          <span className="sr-only">Simply Selling</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-fresh-green transition-colors duration-200"
            prefetch={false}
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-fresh-green transition-colors duration-200"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#why-us"
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-fresh-green transition-colors duration-200"
            prefetch={false}
          >
            Why Us
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:underline underline-offset-4 hover:text-fresh-green transition-colors duration-200"
            prefetch={false}
          >
            FAQs
          </Link>
        </nav>
        <div className="ml-auto lg:ml-4">
          <Button className="bg-fresh-green hover:bg-fresh-green-600 text-white font-semibold">Get Started Free</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-sky-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none min-h-[120px] flex items-center">
                    <span key={currentTextIndex} className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                      {heroTexts[currentTextIndex]}
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Simply Selling is the modern way to sell your property — with professional support, full control,
                    and no agent commissions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-fresh-green hover:bg-fresh-green-600 text-white font-semibold transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                    asChild
                  >
                    <Link href="#" prefetch={false}>
                      Get Started Free
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white bg-transparent transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                    asChild
                  >
                    <Link href="#pricing" prefetch={false}>
                      Compare Pricing Packages
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Trusted by over 100 NZ homeowners</p>
                  <div className="flex gap-4 mt-2 items-center">
                    <Image
                      src="/placeholder.svg?width=100&height=30"
                      alt="TechCrunch"
                      width={100}
                      height={30}
                      className="grayscale opacity-60"
                    />
                    <Image
                      src="/placeholder.svg?width=100&height=30"
                      alt="Forbes"
                      width={100}
                      height={30}
                      className="grayscale opacity-60"
                    />
                    <Image
                      src="/placeholder.svg?width=100&height=30"
                      alt="NZ Herald"
                      width={100}
                      height={30}
                      className="grayscale opacity-60"
                    />
                  </div>
                </div>
              </div>
              <Image
                src="/placeholder.svg?width=600&height=400"
                width="600"
                height="400"
                alt="Beautiful NZ Suburban Home"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section - Enhanced Scroll Lock Experience */}
        <section id="how-it-works" className="relative">
          {/* Container that locks scrolling */}
          <div className="h-[600vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-white via-sky-white to-light-emerald-50">
              <div className="h-full relative">
                {/* Enhanced background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-fresh-green/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `pulse ${3 + Math.random() * 2}s infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced mobile-responsive header */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 text-center px-4">
                  <div
                    className={`inline-block rounded-full bg-gradient-to-r from-fresh-green to-light-emerald px-6 py-3 text-sm font-bold text-white mb-4 shadow-xl border border-white/20 backdrop-blur-sm ${isMobile ? "text-xs px-4 py-2" : ""}`}
                    style={{
                      boxShadow: "0 8px 32px rgba(45, 190, 96, 0.4), inset 0 0 20px rgba(255,255,255,0.1)",
                    }}
                  >
                    ✨ How It Works
                  </div>
                  <h2
                    className={`font-bold tracking-tighter text-white drop-shadow-lg ${isMobile ? "text-xl" : "text-3xl md:text-4xl"}`}
                    style={{
                      textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 40px rgba(45, 190, 96, 0.3)",
                    }}
                  >
                    A Simple Path to a Successful Sale
                  </h2>
                  <p className={`text-white/80 mt-2 font-medium ${isMobile ? "text-sm" : "text-lg"}`}>
                    Commission-free selling made simple
                  </p>
                </div>

                {/* Enhanced Step Progress Indicator */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-charcoal-500 text-sm font-medium mb-2">Steps</div>
                    {steps.map((_, index) => {
                      const isCurrentStep = currentStep === index
                      const isLocked = lockedStep === index
                      const isPassed = currentStep > index

                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full transition-all duration-500"
                            style={{
                              backgroundColor:
                                isPassed || isCurrentStep ? steps[index].accentColor : "rgba(34,34,34,0.3)",
                              boxShadow: isLocked ? `0 0 20px ${steps[index].accentColor}80` : "none",
                              transform: isLocked ? "scale(1.5)" : "scale(1)",
                            }}
                          />
                          <div
                            className="text-xs text-charcoal-500 transition-all duration-300"
                            style={{
                              color: isCurrentStep ? steps[index].accentColor : "rgba(34,34,34,0.6)",
                              fontWeight: isCurrentStep ? "600" : "400",
                            }}
                          >
                            {index + 1}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Steps Container */}
                <div className="relative h-full w-full">
                  {steps.map((step, index) => {
                    const stepProgress = scrollProgress * 6
                    const stepOffset = index - stepProgress
                    const isActive = index === currentStep
                    const isLocked = lockedStep === index

                    return (
                      <HowItWorksStep
                        key={index}
                        step={step}
                        index={index}
                        isActive={isActive}
                        isLocked={isLocked}
                        stepOffset={stepOffset}
                        currentStep={currentStep}
                        isMobile={isMobile}
                      />
                    )
                  })}
                </div>

                {/* Enhanced scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="flex flex-col items-center text-white/90">
                    <span className="text-sm mb-4 font-semibold bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                      {lockedStep >= 0 ? `🎯 Step ${lockedStep + 1} of 6` : "👇 Scroll to explore each step"}
                    </span>
                    <div className="w-8 h-12 border-2 border-fresh-green/60 rounded-full flex justify-center relative bg-black/10 backdrop-blur-sm">
                      <div
                        className="w-2 h-4 bg-gradient-to-b from-fresh-green to-light-emerald rounded-full mt-2"
                        style={{
                          animation: lockedStep >= 0 ? "none" : "bounce 2s infinite",
                          boxShadow: "0 0 10px rgba(45, 190, 96, 0.6)",
                        }}
                      />
                      {lockedStep >= 0 && (
                        <div
                          className="absolute inset-0 border-2 border-fresh-green rounded-full animate-pulse"
                          style={{ boxShadow: "0 0 20px rgba(45, 190, 96, 0.8)" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NZ Suburbs Showcase */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                Serving Beautiful New Zealand Communities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From Auckland's leafy suburbs to Wellington's hillside homes, we help Kiwi families sell their
                properties across the country.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Auckland Suburbs", query: "auckland+suburban+homes+new+zealand" },
                { name: "Wellington Hills", query: "wellington+hillside+homes+new+zealand" },
                { name: "Christchurch Gardens", query: "christchurch+garden+homes+new+zealand" },
                { name: "Hamilton Neighborhoods", query: "hamilton+residential+area+new+zealand" },
              ].map((location, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <Image
                    src={`/placeholder.svg?width=250&height=200&query=${location.query}`}
                    width={250}
                    height={200}
                    alt={location.name}
                    className="rounded-lg object-cover w-full h-40 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="absolute bottom-2 left-2 text-white font-semibold text-sm">{location.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Snapshot Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Transparent Pricing. No Surprises.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose a flat-fee package and save thousands compared to traditional agent commissions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-md gap-8 sm:max-w-4xl sm:grid-cols-2 lg:max-w-5xl lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Basic",
                  subtitle: "Essential Tools to Sell",
                  price: "5,100", // 3,100 + 2,000
                  features: [
                    "12-15 HDR Photos & Floor Plan",
                    "Standard Building Report",
                    "Fixed-fee Conveyancing",
                    "Trade Me Bronze Listing",
                    "LIM Report Included",
                  ],
                  popular: false,
                },
                {
                  title: "Standard",
                  subtitle: "Professional Presentation",
                  price: "6,400", // 4,400 + 2,000
                  features: [
                    "20-24 HDR Photos & Drone",
                    "Full Building Report",
                    "Full-service Conveyancing",
                    "Trade Me Silver Listing",
                    "Printed Photo Signboard",
                  ],
                  popular: true,
                },
                {
                  title: "Premium",
                  subtitle: "Maximum Exposure",
                  price: "8,300", // 6,300 + 2,000
                  features: [
                    "Full Media Bundle (Video, Drone)",
                    "Premium Building Report",
                    "Premium Conveyancing",
                    "Trade Me Gold Listing",
                    "Social Media Ad Boost",
                  ],
                  popular: false,
                },
              ].map((pkg) => (
                <Card
                  key={pkg.title}
                  className={`flex flex-col transform hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer group ${pkg.popular ? "border-fresh-green ring-2 ring-fresh-green shadow-lg" : "border-gray-200 hover:border-fresh-green/50"}`}
                >
                  {pkg.popular && (
                    <div className="bg-fresh-green text-white text-center py-1 text-sm font-semibold rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.title}</CardTitle>
                    <CardDescription className="flex flex-col text-left">
                      <span className="text-sm mb-2 h-10">{pkg.subtitle}</span>
                      <div>
                        <span className="text-4xl font-bold">${pkg.price}</span>
                        <span className="text-muted-foreground"> incl. GST</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 flex-1">
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-fresh-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button
                      className={`w-full transform group-hover:scale-105 transition-all duration-200 ${pkg.popular ? "bg-fresh-green hover:bg-fresh-green-600 text-white" : "hover:bg-fresh-green hover:text-white"}`}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Choose {pkg.title}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <div className="inline-block bg-fresh-green/10 border border-fresh-green text-charcoal rounded-lg px-6 py-4">
                <p className="font-semibold">
                  On average, our sellers save over $25,000 compared to a traditional 3% agent commission on a $1M home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Simply Selling Section */}
        <section id="why-us" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Smarter Way to Sell</h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  We combine the best of technology and professional support to give you an advantage traditional models
                  can't match.
                </p>
                <ul className="grid gap-4">
                  {[
                    { icon: ShieldCheck, text: "No agent commissions, ever." },
                    { icon: UserCheck, text: "Full control with legal and marketing help." },
                    { icon: Camera, text: "Professional photography and listing handled for you." },
                    { icon: Settings, text: "Offer & negotiation tools built in." },
                    { icon: Network, text: "Access to our local conveyancer network." },
                    { icon: Award, text: "A modern platform designed for you." },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 hover:bg-white/50 p-2 rounded-lg transition-all duration-200 cursor-pointer group"
                    >
                      <item.icon className="h-6 w-6 text-fresh-green group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-lg font-medium group-hover:text-fresh-green transition-colors duration-200">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center">
                <Card className="w-full">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Feature</TableHead>
                          <TableHead className="text-center text-fresh-green font-bold">Simply Selling</TableHead>
                          <TableHead className="text-center">Agent</TableHead>
                          <TableHead className="text-center">DIY Site</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { feature: "Commission-Free", simply: true, agent: false, diy: true },
                          { feature: "Legal Guidance", simply: true, agent: true, diy: false },
                          { feature: "Modern Platform", simply: true, agent: true, diy: false },
                          { feature: "Full Control", simply: true, agent: false, diy: true },
                          { feature: "Pro Marketing", simply: true, agent: true, diy: false },
                        ].map((row) => (
                          <TableRow key={row.feature} className="hover:bg-gray-50 transition-colors duration-200">
                            <TableCell className="font-medium">{row.feature}</TableCell>
                            <TableCell className="text-center">
                              {row.simply && <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />}
                            </TableCell>
                            <TableCell className="text-center">
                              {row.agent ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-red-500 font-bold">X</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {row.diy ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-red-500 font-bold">X</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Don't Just Take Our Word For It
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {[
                  {
                    name: "Sarah & Tom L.",
                    quote:
                      "We saved over $22,000 and still got help at every step. The platform made everything so easy to track. Highly recommend!",
                    image: "couple+standing+outside+nz+suburban+home",
                  },
                  {
                    name: "David P.",
                    quote:
                      "As an investor, Simply Selling is a no-brainer. I get professional marketing and legal support without giving away my profits. I've used them for three sales now.",
                    image: "businessman+outside+modern+nz+house",
                  },
                  {
                    name: "Jessica M.",
                    quote:
                      "I was nervous about selling by myself, but Simply Selling gave me the confidence and tools I needed. The team was always there to answer my questions.",
                    image: "woman+outside+beautiful+nz+suburban+home",
                  },
                ].map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                        <CardContent className="flex flex-col md:flex-row items-center justify-center p-6 gap-6">
                          <Image
                            src={`/placeholder.svg?width=120&height=120&query=${testimonial.image}`}
                            width={120}
                            height={120}
                            alt={testimonial.name}
                            className="rounded-full"
                          />
                          <div className="space-y-2 text-center md:text-left">
                            <p className="text-lg italic">"{testimonial.quote}"</p>
                            <p className="font-semibold text-right">- {testimonial.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-charcoal text-white relative overflow-hidden">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?width=1200&height=400')",
            }}
          ></div>
          <div className="container px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skip the agents. Keep the profit.</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-gray-300">
              Ready to take control of your sale? Get started today with a free property valuation.
            </p>
            <div className="mt-6">
              <Button
                size="lg"
                className="hover:bg-warm-orange-600 text-white font-semibold transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:animate-none bg-fresh-green-400"
                asChild
              >
                <Link href="#">Start Selling Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What if I need help with legal contracts?",
                  a: "Our packages include support from qualified legal professionals and conveyancers who can help you prepare and review all necessary documents, ensuring your sale is compliant and secure.",
                },
                {
                  q: "How do buyers find my listing?",
                  a: "We market your property on New Zealand's top real estate portals, including Trade Me, OneRoof, and Homes.co.nz, ensuring maximum visibility to potential buyers.",
                },
                {
                  q: "Do I need to negotiate myself?",
                  a: "You are in control of negotiations, but you're not alone. Our platform provides tools and guides to help you manage offers and counter-offers effectively. For complex situations, our support team is available to provide guidance.",
                },
                {
                  q: "Can I speak to someone if I get stuck?",
                  a: "Absolutely. Our New Zealand-based support team is available via phone and email to help you at any stage of the process. We're here to ensure you have a smooth and successful sale.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i + 1}`}
                  className="hover:bg-gray-50 transition-colors duration-200 rounded-lg px-2"
                >
                  <AccordionTrigger className="text-lg hover:text-fresh-green transition-colors duration-200">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="bg-charcoal text-white border-t border-charcoal-700">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-4">
              <Link href="#" className="flex items-center" prefetch={false}>
                <Mountain className="h-6 w-6 text-fresh-green" />
                <span className="ml-2 text-xl font-bold text-white">Simply Selling</span>
              </Link>
              <p className="text-gray-400">The modern way to sell your property in New Zealand, commission-free.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-2">
              <div className="grid gap-2">
                <h3 className="font-semibold">Navigation</h3>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Home
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Pricing
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  How It Works
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Dashboard Login
                </Link>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold">Legal</h3>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-fresh-green transition-colors duration-200 hover:underline"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </div>
              <div className="grid gap-2">
                <h3 className="font-semibold">Connect</h3>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-fresh-green transition-all duration-200 transform hover:scale-110"
                    prefetch={false}
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-fresh-green transition-all duration-200 transform hover:scale-110"
                    prefetch={false}
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-fresh-green transition-all duration-200 transform hover:scale-110"
                    prefetch={false}
                  >
                    <Youtube className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-fresh-green transition-all duration-200 transform hover:scale-110"
                    prefetch={false}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-charcoal-700 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Simply Selling. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
