"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Volume2,
  VolumeX,
  Send,
  Github,
  Youtube,
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Palette,
  Settings,
  MessageCircle,
  Shield,
  Command,
  Heart,
  Skull,
  Menu,
  Home,
  User,
  Bot,
  Smile,
  Mail,
} from "lucide-react"

export default function TechnologicLanding() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isAngelMode, setIsAngelMode] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Initialize ambient sound
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/placeholder.mp3?query=ambient space sound loop")
      audio.loop = true
      audio.volume = 0.3
      audioRef.current = audio
    }
  }, [])

  // Handle sound toggle
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [soundEnabled])

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  // Generate stars for background
  const generateStars = () => {
    return Array.from({ length: 100 }, (_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
        }}
      />
    ))
  }

  // Inappropriate content filter
  const containsInappropriateContent = (message: string) => {
    const inappropriateTerms = [
      "nsfw",
      "hate",
      "violence",
      "explicit",
      "offensive",
      "inappropriate",
      "sexual",
      "racist",
      "sexist",
    ]
    return inappropriateTerms.some((term) => message.toLowerCase().includes(term))
  }

  // Chat with Groq API
  const sendMessage = async () => {
    if (!chatMessage.trim()) return

    const userMessage = chatMessage
    setChatMessage("")
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    // Play message sound
    if (soundEnabled) {
      const blip = new Audio("/placeholder.mp3?query=message blip sound")
      blip.volume = 0.5
      blip.play().catch(() => {})
    }

    // Check for inappropriate content
    if (containsInappropriateContent(userMessage)) {
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I can't talk about those details.",
          },
        ])
        setIsTyping(false)
      }, 1000)
      return
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      setTimeout(() => {
        setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I'm having trouble connecting right now. Please try again later.",
          },
        ])
        setIsTyping(false)
      }, 1000)
    }
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setSidebarOpen(false)
  }

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "zyra", label: "Zyra", icon: Bot },
    { id: "complimentary", label: "Complimentary", icon: Smile },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Fixed Starry Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        <div className="absolute inset-0 overflow-hidden">{generateStars()}</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Technologic
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sound Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-purple-500/20"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>

              {/* Hamburger Menu */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-purple-500/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-black/95 border-purple-500/30 text-white">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Navigation
                    </h2>
                  </div>
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="w-full justify-start text-white hover:bg-purple-500/20"
                          onClick={() => scrollToSection(item.id)}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out text-center px-4 max-w-4xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Technologic
          </h1>
          <p className="text-2xl md:text-4xl text-blue-300 mb-8 font-light">Smarter Everything.</p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and
            elegance.
          </p>
          <Button
            onClick={() => scrollToSection("about")}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Scroll to Begin
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Technologic
            </h2>
            <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm mb-12">
              <CardContent className="p-8">
                <p className="text-xl text-gray-300 text-center leading-relaxed">
                  We embed AI into unexpected tools — not to replace, but to empower. From silly ideas to smart
                  deployments, Technologic makes the future feel usable.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Brain, title: "AI-enhanced generation", desc: "Smart content creation" },
                { icon: Rocket, title: "GitHub auto-deployment", desc: "Seamless CI/CD" },
                { icon: Palette, title: "Instant site builds", desc: "HTML/CSS/JS generation" },
                { icon: Zap, title: "Groq-powered speed", desc: "Lightning-fast AI" },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-400 mb-2" />
                    <CardTitle className="text-lg text-purple-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zyra Section */}
      <section id="zyra" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="text-center mb-12">
              <Separator className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Meet Zyra
              </h2>
              <p className="text-xl text-blue-300 mb-4">The Smartest Discord Bot Ever Made</p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Over 100+ modules. Groq-powered AI. Smarter than most bots combined. From chat to moderation to
                automation, Zyra is designed to scale conversations in real-time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Command, title: "100+ modular commands", desc: "Comprehensive toolkit" },
                { icon: MessageCircle, title: "Real-time AI chat", desc: "Intelligent conversations" },
                { icon: Shield, title: "Automation & Moderation", desc: "Smart server management" },
                { icon: Settings, title: "Custom Embeds & APIs", desc: "Tailored integrations" },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-purple-400 mb-2" />
                    <CardTitle className="text-sm text-blue-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs text-gray-400">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Chat Interface - Fixed Dark Theme */}
            <Card className="bg-gradient-to-br from-black/80 to-purple-900/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Talk to Zyra
                </CardTitle>
                <CardDescription className="text-center text-gray-300">
                  Chat with our AI-powered Discord bot
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-black/40">
                <ScrollArea className="h-96 mb-4 p-4 border border-purple-500/20 rounded-lg bg-black/50">
                  <div className="space-y-4">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                              : "bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message to Zyra..."
                    className="bg-black/70 border-purple-500/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complimentary Section */}
      <section id="complimentary" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Complimentary
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12">Angelic or Evil?</p>

            <div className="flex justify-center items-center space-x-4 mb-12">
              <Heart
                className={`h-8 w-8 transition-colors duration-300 ${isAngelMode ? "text-pink-400" : "text-gray-600"}`}
              />
              <Switch
                checked={!isAngelMode}
                onCheckedChange={(checked) => setIsAngelMode(!checked)}
                className="data-[state=checked]:bg-red-600"
              />
              <Skull
                className={`h-8 w-8 transition-colors duration-300 ${!isAngelMode ? "text-red-400" : "text-gray-600"}`}
              />
            </div>

            <Card
              className={`backdrop-blur-sm transition-all duration-500 ${
                isAngelMode
                  ? "bg-gradient-to-br from-pink-900/20 to-blue-900/20 border-pink-500/30"
                  : "bg-gradient-to-br from-red-900/20 to-purple-900/20 border-red-500/30"
              }`}
            >
              <CardHeader>
                <CardTitle
                  className={`text-2xl text-center transition-colors duration-300 ${isAngelMode ? "text-pink-300" : "text-red-300"}`}
                >
                  {isAngelMode ? "😇 Angel Mode" : "😈 Devil Mode"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8 text-center">
                  {isAngelMode ? (
                    <>
                      <p className="text-pink-200">"You radiate good code energy."</p>
                      <p className="text-pink-200">"Your UI design has no right being this pretty."</p>
                    </>
                  ) : (
                    <>
                      <p className="text-red-200">"You're the human version of a merge conflict."</p>
                      <p className="text-red-200">"I've seen AI-generated HTML cleaner than your commits."</p>
                    </>
                  )}
                </div>

                <div className="flex justify-center space-x-4">
                  <Badge
                    variant="outline"
                    className={`transition-colors duration-300 ${isAngelMode ? "border-pink-500 text-pink-300" : "border-red-500 text-red-300"}`}
                  >
                    .pranked.html
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`transition-colors duration-300 ${isAngelMode ? "border-pink-500 text-pink-300" : "border-red-500 text-red-300"}`}
                  >
                    .css
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`transition-colors duration-300 ${isAngelMode ? "border-pink-500 text-pink-300" : "border-red-500 text-red-300"}`}
                  >
                    .js
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Build Smarter
            </h2>

            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full"
              >
                Join Zyra Waitlist
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full"
              >
                Launch Complimentary
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg rounded-full"
              >
                Deploy a Smart Site
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 relative z-10 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Zyra and Complimentary are still in development. We're looking for contributors (rev-share based).
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              <Button
                variant="outline"
                size="icon"
                className="border-purple-500 hover:bg-purple-500/20 bg-transparent backdrop-blur-sm text-white"
                asChild
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-purple-500 hover:bg-purple-500/20 bg-transparent backdrop-blur-sm text-white"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-purple-500 hover:bg-purple-500/20 bg-transparent backdrop-blur-sm text-white"
                asChild
              >
                <a href="mailto:contact@technologic.dev" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>

            <p className="text-sm text-gray-500">Made by humans... and one very sarcastic AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
