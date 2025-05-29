import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Phone,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Target,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Executive",
      avatar: "/placeholder.svg?height=40&width=40",
      quote: "WakeCall saved my career! I never miss important meetings anymore. The reliability is incredible.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Frequent Traveler",
      avatar: "/placeholder.svg?height=40&width=40",
      quote: "Perfect for catching early flights. The retry system ensures I always wake up, even when I'm exhausted.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Medical Student",
      avatar: "/placeholder.svg?height=40&width=40",
      quote: "During exam season, WakeCall is my lifesaver. Reliable, professional, and exactly what I needed.",
      rating: 5,
    },
  ]

  const benefits = [
    {
      icon: Target,
      title: "Never Miss Important Moments",
      description: "Eliminate the anxiety of oversleeping before crucial events",
    },
    {
      icon: Users,
      title: "Professional Reliability",
      description: "Human-powered calls that adapt to your specific needs",
    },
    {
      icon: Sparkles,
      title: "Peace of Mind",
      description: "Sleep better knowing you have a backup beyond your alarm",
    },
  ]

  const faqs = [
    {
      question: "How reliable are the wake-up calls?",
      answer:
        "Our wake-up calls have a 99.9% success rate. We use multiple backup systems and human operators to ensure you never miss a call when it matters most.",
    },
    {
      question: "Can I schedule calls for the same day?",
      answer:
        "Yes! You can schedule wake-up calls as little as 30 minutes in advance. However, we recommend scheduling at least 2 hours ahead for optimal reliability.",
    },
    {
      question: "What happens if I don't answer the first call?",
      answer:
        "Our smart retry system will automatically call you again at 2-minute intervals up to 5 times. Each call will be slightly more persistent to ensure you wake up.",
    },
    {
      question: "Do you offer international wake-up calls?",
      answer:
        "Currently, we provide wake-up calls within the United States and Canada. We're working on expanding to international markets soon.",
    },
    {
      question: "Can I cancel or modify a scheduled call?",
      answer:
        "You can cancel or modify your wake-up calls up to 15 minutes before the scheduled time through your dashboard.",
    },
    {
      question: "Is there a limit to how many calls I can schedule?",
      answer:
        "No limits! Schedule as many wake-up calls as you need. Our pricing is per call, so you only pay for what you use.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Auth Buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-green-400" />
            <span className="font-bold text-xl text-white">WakeCall</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-white hover:text-green-400 hover:bg-green-500/10">
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-medium"
            >
              <Link href="/auth/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-950 pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-lime-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Trusted by 10,000+ users worldwide
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent leading-tight">
              Never Oversleep Again
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional wake-up calls that ensure you never miss life's most important moments. Reliable,
              human-powered, and designed for when failure is not an option.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black px-8 py-6 text-lg font-semibold"
              >
                <Link href="/schedule">
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule Your Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-6 text-lg border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No setup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>99.9% reliability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for reliable wake-up calls, built with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-900 border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Professional Calls</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-400">
                  Human-powered wake-up calls delivered with professionalism and care
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Precise Timing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-400">
                  Schedule calls down to the minute with our accurate timing system
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Smart Retry System</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-400">
                  Automatic retry mechanism ensures you wake up even if you miss the first call
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-xl text-white">Instant Setup</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base text-gray-400">
                  Simple interface to schedule calls in seconds with custom reasons
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-green-950">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose WakeCall?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your morning routine and eliminate the stress of oversleeping
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto">
                  <benefit.icon className="h-10 w-10 text-black" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers who never oversleep anymore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-green-500/20 shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:border-green-500/40"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-green-400 text-green-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6 leading-relaxed text-gray-300">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-green-500 text-black">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Everything you need to know about WakeCall</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-900 border border-green-500/20 rounded-lg px-6 hover:border-green-500/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-white hover:text-green-400 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 text-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Never Oversleep Again?</h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Join thousands of professionals who trust WakeCall for their most important mornings. Schedule your first
              wake-up call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-lg bg-black text-green-400 hover:bg-gray-900"
              >
                <Link href="/schedule">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-black text-black hover:bg-black hover:text-green-400"
              >
                <Link href="/auth/signup">Create Free Account</Link>
              </Button>
            </div>
            <p className="text-sm opacity-75">No credit card required • 99.9% uptime guarantee • 24/7 support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-green-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-green-400" />
                <span className="font-bold text-xl">WakeCall</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional wake-up calls for life's most important moments. Reliable, human-powered, and always on
                time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-green-400">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/schedule" className="hover:text-green-400 transition-colors">
                    Schedule Call
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-green-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-green-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-green-400 transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-green-400">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-green-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-green-400 transition-colors">
                    System Status
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-green-400 transition-colors">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-green-400">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-green-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-green-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-green-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-green-400 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 WakeCall. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
