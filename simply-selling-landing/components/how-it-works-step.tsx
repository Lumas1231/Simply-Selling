"use client"

import { Home, Tag, Camera, BarChart, Handshake, FileText } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Step {
  icon: LucideIcon
  title: string
  description: string
  detail: string
  bgColor: string
  accentColor: string
}

interface HowItWorksStepProps {
  step: Step
  index: number
  isActive: boolean
  isLocked: boolean
  stepOffset: number
  currentStep: number
}

export const steps: Step[] = [
  {
    icon: Home,
    title: "Instant Valuation",
    description: "Get a free data-driven estimate of your property's worth in minutes.",
    detail:
      "Our advanced algorithm analyzes recent sales, market trends, and property features to provide you with an accurate starting point for pricing your home.",
    bgColor: "from-white to-light-emerald-50",
    accentColor: "#2DBE60",
  },
  {
    icon: Tag,
    title: "Choose Your Package",
    description: "Select a flat-fee package that fits your needs, from basic to premium.",
    detail:
      "Compare our transparent pricing options and select the level of service that matches your selling goals and budget.",
    bgColor: "from-sky-white to-fresh-green-50",
    accentColor: "#A1E8AF",
  },
  {
    icon: Camera,
    title: "Book Pro Services",
    description: "Schedule professional photography, staging, and reports right from your dashboard.",
    detail:
      "Connect with our network of professional photographers, home stagers, and building inspectors to showcase your property at its best.",
    bgColor: "from-light-emerald-50 to-white",
    accentColor: "#2DBE60",
  },
  {
    icon: BarChart,
    title: "Launch Your Listing",
    description: "We market your home across top NZ platforms like Trade Me and OneRoof.",
    detail:
      "Your property gets maximum exposure across New Zealand's most popular real estate websites, reaching thousands of potential buyers.",
    bgColor: "from-fresh-green-50 to-sky-white",
    accentColor: "#A1E8AF",
  },
  {
    icon: Handshake,
    title: "Manage Offers",
    description: "Receive and manage offers through your simple, intuitive seller dashboard.",
    detail:
      "Track inquiries, schedule viewings, and negotiate offers all from one central location with built-in communication tools.",
    bgColor: "from-white to-light-emerald-100",
    accentColor: "#2DBE60",
  },
  {
    icon: FileText,
    title: "Complete the Sale",
    description: "Our team and legal partners help you finalize the sale with confidence.",
    detail:
      "From contract preparation to settlement, our legal experts ensure every detail is handled professionally and securely.",
    bgColor: "from-sky-white to-fresh-green-100",
    accentColor: "#A1E8AF",
  },
]

export function HowItWorksStep({ step, index, isActive, isLocked, stepOffset, currentStep }: HowItWorksStepProps) {
  // Enhanced mobile-responsive calculations
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const mobileScale = isMobile ? 0.9 : 1
  const blur = isActive || isLocked ? 0 : Math.min(10, Math.abs(stepOffset) * 4)
  const mobileBlur = isMobile ? blur * 0.7 : blur

  // Adaptive transform values for mobile
  const transformValue = isLocked ? 0 : stepOffset * (isMobile ? 80 : 100)
  const scale = (isActive || isLocked ? 1 : Math.max(0.85, 1 - Math.abs(stepOffset) * 0.15)) * mobileScale

  // Parallax background movement
  const backgroundTransform = isLocked ? 0 : stepOffset * 10

  // Improved opacity and scale calculations with better ratios
  const opacity = isActive || isLocked ? 1 : Math.max(0.2, 1 - Math.abs(stepOffset) * 0.5)

  // Enhanced shadow depth when active/locked
  const boxShadow = isActive || isLocked ? "0 20px 60px rgba(0, 0, 0, 0.4)" : "0 10px 30px rgba(0, 0, 0, 0.2)"

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `translateX(${transformValue}%) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: isActive || isLocked ? 20 : Math.max(1, 10 - Math.abs(Math.floor(stepOffset))),
        // Enhanced transition with custom cubic-bezier curve
        transition: isLocked
          ? "none"
          : "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease-out",
        willChange: isLocked ? "auto" : "transform, opacity, filter",
        boxShadow: boxShadow,
      }}
    >
      {/* Enhanced background with better layering */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${step.bgColor}`}
        style={{
          transform: `translateX(${backgroundTransform}px)`,
          transition: isLocked ? "none" : "transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* New Zealand landscape overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage: `url('/placeholder.svg?width=1920&height=1080')`,
            filter: "blur(1px)",
          }}
        />

        {/* Enhanced dynamic particles with brand colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: isMobile ? 20 : 35 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background:
                  i % 3 === 0
                    ? `radial-gradient(circle, ${step.accentColor}80, transparent)`
                    : i % 3 === 1
                      ? `radial-gradient(circle, #2DBE6080, transparent)`
                      : `radial-gradient(circle, #A1E8AF60, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 4}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: isActive || isLocked ? 0.9 : 0.4,
                transform: `translateY(${Math.sin(Date.now() * 0.001 + i) * 15}px) scale(${0.5 + Math.random() * 0.5})`,
                transition: "opacity 800ms ease-out",
              }}
            />
          ))}
        </div>

        {/* Enhanced gradient overlays with brand colors */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 80%, ${step.accentColor}10 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, #2DBE6008 0%, transparent 50%),
              radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(249,249,249,0.9) 70%, rgba(255,255,255,1) 100%)
            `,
            opacity: isActive || isLocked ? 0.85 : 0.95,
          }}
        />

        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(30deg, ${step.accentColor}20 12%, transparent 12.5%, transparent 87%, ${step.accentColor}20 87.5%, ${step.accentColor}20),
              linear-gradient(150deg, ${step.accentColor}20 12%, transparent 12.5%, transparent 87%, ${step.accentColor}20 87.5%, ${step.accentColor}20),
              linear-gradient(30deg, ${step.accentColor}20 12%, transparent 12.5%, transparent 87%, ${step.accentColor}20 87.5%, ${step.accentColor}20),
              linear-gradient(150deg, ${step.accentColor}20 12%, transparent 12.5%, transparent 87%, ${step.accentColor}20 87.5%, ${step.accentColor}20)
            `,
            backgroundSize: "80px 140px",
            backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px",
          }}
        />
      </div>

      {/* Enhanced content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
        <div
          className="max-w-6xl mx-auto text-center"
          style={{
            transition: isLocked ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease-out",
            opacity: isActive || isLocked ? 1 : 0,
            transform: isActive || isLocked ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Enhanced step indicator */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="flex h-28 w-28 items-center justify-center rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm"
              style={{
                background: `
                  linear-gradient(135deg, ${step.accentColor}, ${step.accentColor}60),
                  linear-gradient(45deg, rgba(255,255,255,0.1), transparent)
                `,
                boxShadow: `
                  0 0 50px ${step.accentColor}50, 
                  inset 0 0 30px rgba(255,255,255,0.15),
                  0 20px 40px rgba(0,0,0,0.3)
                `,
              }}
            >
              <step.icon
                className="h-14 w-14 text-charcoal drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))",
                }}
              />
            </div>
            <div className="ml-8 text-left">
              <div
                className="font-bold text-xl mb-2 tracking-wide text-fresh-green"
                style={{
                  textShadow: `0 0 20px rgba(45, 190, 96, 0.6), 0 2px 4px rgba(0,0,0,0.5)`,
                }}
              >
                Step {index + 1} of 6
              </div>
              <div className="text-charcoal-800 text-lg font-medium tracking-wide">Simply Selling Process</div>
            </div>
          </div>

          {/* Enhanced responsive title */}
          <h3
            className={`font-extrabold mb-8 leading-tight text-charcoal ${isMobile ? "text-3xl" : "text-5xl md:text-6xl lg:text-7xl"}`}
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(45, 190, 96, 0.2)",
              letterSpacing: isMobile ? "-0.01em" : "-0.02em",
            }}
          >
            {step.title}
          </h3>

          {/* Enhanced description and detail */}
          <p
            className={`mb-10 text-charcoal-800 max-w-4xl mx-auto leading-relaxed font-medium ${isMobile ? "text-lg" : "text-xl md:text-2xl"}`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            {step.description}
          </p>
          <p
            className={`text-charcoal-700 max-w-3xl mx-auto leading-relaxed ${isMobile ? "text-base" : "text-lg"}`}
            style={{ textShadow: "0 1px 5px rgba(0,0,0,0.6)" }}
          >
            {step.detail}
          </p>

          {/* Enhanced progress bar with micro-animations */}
          <div className="flex justify-center mt-20">
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="relative h-4 rounded-full transition-all duration-700 ease-out overflow-hidden border border-white/20"
                  style={{
                    width:
                      i === index && (isActive || isLocked)
                        ? isMobile
                          ? "4.5rem"
                          : "6rem"
                        : isMobile
                          ? "3rem"
                          : "4rem",
                    background:
                      i <= currentStep
                        ? `linear-gradient(90deg, #2DBE60, ${step.accentColor}, #A1E8AF, #2DBE60)`
                        : "rgba(255,255,255,0.15)",
                    transform: i === index && (isActive || isLocked) ? `scale(1.2)` : `scale(1)`,
                    boxShadow:
                      i === index && (isActive || isLocked)
                        ? `
                          0 0 40px ${step.accentColor}90, 
                          0 0 80px ${step.accentColor}50, 
                          inset 0 0 20px rgba(255,255,255,0.2),
                          0 8px 16px rgba(0,0,0,0.3)
                        `
                        : i <= currentStep
                          ? `0 0 20px ${step.accentColor}70, 0 4px 8px rgba(0,0,0,0.2)`
                          : "0 2px 4px rgba(0,0,0,0.1)",
                    transition: isLocked ? "none" : "all 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {/* Animated shimmer effect */}
                  {i <= currentStep && (
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      style={{
                        animation: "shimmer 3s infinite",
                        transform: "translateX(-100%)",
                      }}
                    />
                  )}
                  {/* Pulse effect for active step */}
                  {i === index && (isActive || isLocked) && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${step.accentColor}30, transparent)`,
                        animation: "pulse 2s infinite",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced mobile-friendly status indicator */}
          <div
            className={`absolute ${isMobile ? "bottom-4 right-4" : "bottom-8 right-8"} flex items-center text-charcoal-500`}
            style={{
              opacity: isActive || isLocked ? 1 : 0.2,
              transform: isActive || isLocked ? "translateX(0px)" : "translateX(30px)",
              transition: isLocked ? "none" : "all 700ms ease-out",
              fontSize: isMobile ? "0.875rem" : "1.125rem",
            }}
          >
            <span className="font-medium mr-2">{isLocked ? "🔒 Focused" : isMobile ? "👆 Swipe" : "📍 Scroll"}</span>
            <div className="flex items-center">
              <div
                className={`${isMobile ? "w-8 h-0.5" : "w-12 h-1"} bg-gradient-to-r mr-2 rounded-full`}
                style={{
                  background: isLocked
                    ? `linear-gradient(90deg, ${step.accentColor}80, transparent)`
                    : "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)",
                }}
              />
              <div
                className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} border-t-2 border-r-2 transform rotate-45`}
                style={{
                  borderColor: isLocked ? step.accentColor : "rgba(255,255,255,0.7)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px ${step.accentColor}40; }
        50% { box-shadow: 0 0 40px ${step.accentColor}80, 0 0 60px ${step.accentColor}40; }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 0.2;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.1);
        }
      }
    `}</style>
    </div>
  )
}
