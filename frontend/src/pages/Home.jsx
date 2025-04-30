import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {Link} from "react-router-dom";
import { Button } from "../components/ui/button"
import {
  ArrowRight,
  BarChart3,
  Building,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  HeartHandshake,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Plane,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Wrench,
} from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* <header className="border-b sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <Plane className="h-6 w-6 text-primary" />
            <span>AeroTrack</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Solutions
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </a>
            <a
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Login
            </a>
          </nav>
        </div>
      </header> */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full max-w-7xl m-auto py-10 md:py-12 lg:py-14 xl:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Aircraft Parts Ecosystem for the Modern Aviation Industry
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Streamline your aviation supply chain with our comprehensive platform for buying, selling, and
                    tracking aircraft parts with complete maintenance history.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="/login">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#learn-more">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center">
                <img
                  alt="Aircraft Parts Illustration"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  src="https://c8.alamy.com/comp/B04DEF/us-blackbird-spy-plane-imperial-war-museumduxford-B04DEF.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="learn-more">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects aviation companies in a secure ecosystem for parts management, supply chain
                optimization, and maintenance tracking.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 mt-8">
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Parts Marketplace</h3>
                <p className="text-center text-muted-foreground">
                  Buy and sell certified aircraft parts with complete transparency and documentation.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Supply Chain Management</h3>
                <p className="text-center text-muted-foreground">
                  Track parts from manufacturer to installation with our comprehensive supply chain tools.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-background rounded-lg shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Maintenance Records</h3>
                <p className="text-center text-muted-foreground">
                  Complete digital ledger of parts history, maintenance records, and certification documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features Tabs */}
        <section className="w-full py-12 md:py-24 lg:py-32 w-full max-w-7xl  mx-auto">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive Solutions</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our suite of tools designed specifically for the aviation industry
              </p>
            </div>

            <div className="mt-12">
              <Tabs defaultValue="marketplace" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                  <TabsTrigger value="supplychain">Supply Chain</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>
                <TabsContent value="marketplace" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Aircraft Parts Marketplace</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Global Reach</h4>
                            <p className="text-muted-foreground">
                              Connect with suppliers and buyers from around the world to find the exact parts you need.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Verified Listings</h4>
                            <p className="text-muted-foreground">
                              All parts are verified for authenticity with complete documentation and certification.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Secure Transactions</h4>
                            <p className="text-muted-foreground">
                              Built-in escrow system ensures safe and secure transactions between buyers and sellers.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Advanced Search</h4>
                            <p className="text-muted-foreground">
                              Find exactly what you need with our powerful search and filtering capabilities.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=400&width=500"
                        alt="Marketplace Interface"
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="supplychain" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Supply Chain Management</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">End-to-End Tracking</h4>
                            <p className="text-muted-foreground">
                              Track parts from manufacturer to installation with real-time updates and notifications.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Inventory Management</h4>
                            <p className="text-muted-foreground">
                              Optimize your inventory with predictive analytics and automated reordering.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Supplier Management</h4>
                            <p className="text-muted-foreground">
                              Manage supplier relationships, performance metrics, and compliance documentation.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Logistics Optimization</h4>
                            <p className="text-muted-foreground">
                              Streamline shipping and logistics with integrated carrier services and route optimization.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=400&width=500"
                        alt="Supply Chain Dashboard"
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="maintenance" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Maintenance Records</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Digital Maintenance Logs</h4>
                            <p className="text-muted-foreground">
                              Maintain comprehensive digital records of all maintenance activities and inspections.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Compliance Management</h4>
                            <p className="text-muted-foreground">
                              Stay compliant with aviation regulations with automated alerts and documentation.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Part Lifecycle Tracking</h4>
                            <p className="text-muted-foreground">
                              Track the complete lifecycle of each part from installation to retirement.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold">Maintenance Forecasting</h4>
                            <p className="text-muted-foreground">
                              Predict maintenance needs and schedule service based on usage patterns and manufacturer
                              recommendations.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src="/placeholder.svg?height=400&width=500"
                        alt="Maintenance Records Interface"
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Aviation Leaders</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the growing community of aviation companies using AeroTrack
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-4xl font-bold text-primary">500+</span>
                <span className="text-muted-foreground text-center">Aviation Companies</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-4xl font-bold text-primary">50,000+</span>
                <span className="text-muted-foreground text-center">Parts Traded Monthly</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-4xl font-bold text-primary">99.9%</span>
                <span className="text-muted-foreground text-center">Platform Uptime</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-4xl font-bold text-primary">30+</span>
                <span className="text-muted-foreground text-center">Countries Served</span>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex justify-center">
                    <img
                      src={`/placeholder.svg?height=60&width=120&text=Partner ${i}`}
                      alt={`Partner ${i}`}
                      className="h-12 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Customers Say</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from aviation professionals who have transformed their operations with AeroTrack
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Global Airways</h4>
                      <p className="text-sm text-muted-foreground">Commercial Airline</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground">
                    "AeroTrack has revolutionized how we manage our aircraft parts inventory. The platform's
                    comprehensive tracking and maintenance records have helped us improve compliance and reduce
                    downtime."
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Director of Maintenance</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">AeroRepair Solutions</h4>
                      <p className="text-sm text-muted-foreground">MRO Provider</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground">
                    "The marketplace functionality has allowed us to source hard-to-find parts quickly and efficiently.
                    The verification system gives us confidence in the parts we're purchasing."
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Procurement Manager</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">SkyParts International</h4>
                      <p className="text-sm text-muted-foreground">Parts Distributor</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground">
                    "As a parts distributor, AeroTrack has expanded our reach globally. The supply chain management
                    tools have streamlined our operations and improved our delivery times significantly."
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium">David Rodriguez</p>
                    <p className="text-sm text-muted-foreground">CEO</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 w-full max-w-7xl  mx-auto">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Getting Started is Easy</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Follow these simple steps to join the AeroTrack ecosystem
              </p>
            </div>

            <div className="relative mt-12">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border hidden md:block" />

              {/* Steps */}
              <div className="space-y-12 relative">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="md:text-right order-2 md:order-1">
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold mb-2">1. Register Your Company</h3>
                      <p className="text-muted-foreground">
                        Create an account with your company details and verify your email to join the platform.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center order-1 md:order-2 relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      1
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="flex justify-center relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      2
                    </div>
                  </div>
                  <div>
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold mb-2">2. Set Up Your Inventory</h3>
                      <p className="text-muted-foreground">
                        Import your existing inventory or add parts manually to start tracking and managing your assets.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="md:text-right order-2 md:order-1">
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold mb-2">3. Connect Your Supply Chain</h3>
                      <p className="text-muted-foreground">
                        Invite suppliers, customers, and partners to join your network for seamless collaboration.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center order-1 md:order-2 relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      3
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className="flex justify-center relative">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                      4
                    </div>
                  </div>
                  <div>
                    <div className="bg-background p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-bold mb-2">4. Start Trading and Tracking</h3>
                      <p className="text-muted-foreground">
                        Begin buying, selling, and tracking parts with full visibility into the supply chain and
                        maintenance history.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href="/signup">
                <Button size="lg" className="gap-1.5">
                  Register Your Company
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose AeroTrack</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform offers unique advantages for the aviation industry
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Regulatory Compliance</h3>
                <p className="text-muted-foreground">
                  Built to meet aviation industry standards and regulations, ensuring your operations remain compliant
                  with FAA, EASA, and other global regulatory bodies.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security protocols protect your sensitive data and transactions with end-to-end
                  encryption and secure authentication.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Operational Efficiency</h3>
                <p className="text-muted-foreground">
                  Streamline processes and reduce manual work with automated workflows, notifications, and reporting
                  tools designed for aviation operations.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Traceability</h3>
                <p className="text-muted-foreground">
                  Track every part's journey from manufacture to installation with comprehensive history and
                  documentation accessible at any time.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Intuitive Dashboard</h3>
                <p className="text-muted-foreground">
                  User-friendly interface with customizable dashboards and reports to give you the insights you need at
                  a glance.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our aviation industry experts provide 24/7 support and personalized onboarding to ensure your success
                  on the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our platform
              </p>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How secure is the AeroTrack platform?</AccordionTrigger>
                  <AccordionContent>
                    AeroTrack employs enterprise-grade security measures including end-to-end encryption, secure
                    authentication protocols, regular security audits, and compliance with industry standards. All data
                    is stored in SOC 2 compliant data centers with redundant backups.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can AeroTrack integrate with our existing systems?</AccordionTrigger>
                  <AccordionContent>
                    Yes, AeroTrack offers robust API integration capabilities that allow seamless connection with your
                    existing ERP, MRO, and inventory management systems. Our integration team will work with you to
                    ensure a smooth transition and data synchronization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does AeroTrack verify part authenticity?</AccordionTrigger>
                  <AccordionContent>
                    Our platform uses a multi-layered verification process that includes document validation, serial
                    number tracking, and certification verification. Sellers must provide complete documentation, and
                    our system maintains a comprehensive audit trail for each part.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What types of companies can join AeroTrack?</AccordionTrigger>
                  <AccordionContent>
                    AeroTrack is designed for all participants in the aviation supply chain, including airlines, MRO
                    providers, parts manufacturers, distributors, and repair stations. Companies must complete our
                    verification process to ensure the integrity of our marketplace.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How much does AeroTrack cost?</AccordionTrigger>
                  <AccordionContent>
                    We offer flexible pricing plans based on your company size and needs. Our subscription models
                    include Basic, Professional, and Enterprise tiers with different feature sets. Contact our sales
                    team for a customized quote and to discuss which plan is right for your business.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>How long does implementation take?</AccordionTrigger>
                  <AccordionContent>
                    Basic implementation can be completed in as little as 2-4 weeks. For larger organizations with
                    complex integration needs, full implementation typically takes 6-8 weeks. Our dedicated onboarding
                    team will guide you through every step of the process.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Aviation Operations?
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  Join hundreds of aviation companies already using AeroTrack to streamline their parts management,
                  supply chain, and maintenance records.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Contact Sales
                    </Button>
                  </a>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by <span className="font-medium text-foreground">500+</span> aviation companies worldwide
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=550&width=750"
                  alt="AeroTrack Dashboard Preview"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog/News Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest Industry Insights</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Stay updated with the latest news and trends in aviation supply chain management
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Article ${i}`}
                      alt={`Article ${i}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">May 15, 2025</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {i === 1
                        ? "The Future of Aircraft Parts Supply Chain"
                        : i === 2
                          ? "How Digital Tracking Improves Maintenance Efficiency"
                          : "New Regulations Affecting Aviation Parts Distribution"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {i === 1
                        ? "Explore how new technologies are reshaping the aviation supply chain landscape..."
                        : i === 2
                          ? "Learn how digital tracking systems are revolutionizing aircraft maintenance..."
                          : "Stay compliant with the latest regulatory changes in the aviation industry..."}
                    </p>
                    <a href="#" className="flex items-center text-primary font-medium">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href="/blog">
                <Button variant="outline">View All Articles</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about AeroTrack? Our team is here to help you find the right solution for your aviation
                  business.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Headquarters</h3>
                      <p className="text-muted-foreground">123 Aviation Way, Suite 400</p>
                      <p className="text-muted-foreground">Seattle, WA 98101, USA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact</h3>
                      <p className="text-muted-foreground">info@aerotrack.com</p>
                      <p className="text-muted-foreground">+1 (800) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Support</h3>
                      <p className="text-muted-foreground">support@aerotrack.com</p>
                      <p className="text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Request a Demo</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your Aviation Company" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us about your needs..."
                        />
                      </div>
                      <Button className="w-full">Submit Request</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 font-semibold mb-4">
                <Plane className="h-6 w-6 text-primary" />
                <span>AeroTrack</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Transforming aviation supply chain management with comprehensive parts tracking and maintenance records.
              </p>
              <div className="flex gap-4">
                {/* Social media icons would go here */}
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="sr-only">aedIn</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    GDPR
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 AeroTrack. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Designed and built with ❤️ for the aviation industry
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
