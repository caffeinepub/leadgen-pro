import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  DollarSign,
  Loader2,
  Menu,
  MessageCircle,
  Settings,
  Star,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ─── Fade-up animation variants ───────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Nav Links ────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── Stat bar items ───────────────────────────────────────────────
const STATS = [
  { value: "150+", label: "Clients Served" },
  { value: "10,000+", label: "Leads Generated" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "3 Years", label: "Experience" },
];

// ─── Services ─────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Settings,
    title: "LinkedIn Profile Optimization",
    description:
      "Craft a magnetic profile that positions you as an authority and attracts your ideal clients - even while you sleep. First impressions close deals before you ever say hello.",
  },
  {
    icon: MessageCircle,
    title: "Done-For-You Outreach",
    description:
      "I run your entire outreach engine: prospect targeting, personalised messaging sequences, follow-ups, and connection requests - all tailored precisely to your niche and offer.",
  },
  {
    icon: Users,
    title: "Lead Nurturing & Handover",
    description:
      "Warm leads are cultivated through genuine, valuable conversations and handed directly to you only when they're ready to buy. No time wasted on tyre-kickers.",
  },
];

// ─── How it works ─────────────────────────────────────────────────
const STEPS = [
  {
    num: "01",
    title: "We Map Your Ideal Client",
    desc: "A deep-dive onboarding call to understand your offer, your audience, and your growth goals - so the strategy is built around you, not a template.",
  },
  {
    num: "02",
    title: "I Build & Launch Your System",
    desc: "Profile optimisation plus a full outreach campaign is researched, written, and launched within 5 business days. You review, I execute.",
  },
  {
    num: "03",
    title: "You Get Booked Calls",
    desc: "Warm, qualified conversations land in your calendar. You just show up, have great calls, and close. That's the whole job.",
  },
];

// ─── Results ─────────────────────────────────────────────────────
const RESULTS = [
  {
    icon: Calendar,
    headline: "32 Booked Calls in 30 Days",
    sub: "Business Coach",
    color: "oklch(0.72 0.15 75)",
  },
  {
    icon: DollarSign,
    headline: "$47K in New Revenue",
    sub: "B2B Consultant - 60 days",
    color: "oklch(0.65 0.18 155)",
  },
  {
    icon: TrendingUp,
    headline: "LinkedIn Connections 3×'d",
    sub: "SaaS Founder - 45 days",
    color: "oklch(0.6 0.18 240)",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "Working with ShashiRekha completely transformed how I think about LinkedIn. In just 6 weeks, I had more discovery calls booked than in the previous 6 months.",
    name: "Arjun Sharma",
    role: "Business Coach",
    initials: "AS",
  },
  {
    quote:
      "I was skeptical at first, but the results were undeniable. Within 45 days, my pipeline went from empty to overflowing. The ROI was extraordinary.",
    name: "Sophie Adeyemi",
    role: "Marketing Consultant",
    initials: "SA",
  },
  {
    quote:
      "I finally stopped worrying about where my next client would come from. ShashiRekha's system runs quietly in the background and just delivers results. Highly recommend.",
    name: "Rohan Nair",
    role: "SaaS Founder",
    initials: "RN",
  },
];

// ─── Why Work With Me ─────────────────────────────────────────────
const WHY_ITEMS = [
  {
    icon: Check,
    title: "100% Done-For-You",
    desc: "You focus on your business; I handle every aspect of the outreach.",
  },
  {
    icon: BarChart3,
    title: "No Ads, No Cold Calling",
    desc: "Pure organic LinkedIn strategy that feels authentic and builds real relationships.",
  },
  {
    icon: TrendingUp,
    title: "Transparent Reporting",
    desc: "Weekly updates so you always know exactly what's happening and what's working.",
  },
  {
    icon: Users,
    title: "Niche-Specific Strategy",
    desc: "Customised for your industry, your offer, and your ideal audience.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How quickly will I see results?",
    a: "Most clients start seeing booked calls within the first 2-3 weeks of launch. The exact timeline depends on your offer, niche, and target audience, but we build for speed without sacrificing quality.",
  },
  {
    q: "Do I need a large LinkedIn following?",
    a: "Not at all. We start from wherever you are and build strategically from there. Many of my best-performing clients had fewer than 500 connections when we began.",
  },
  {
    q: "What industries do you work with?",
    a: "Coaches, consultants, agency owners, SaaS founders, and B2B service providers. If your ideal client is a professional or business decision-maker, LinkedIn is the right channel.",
  },
  {
    q: "How is this different from LinkedIn ads?",
    a: "This is 100% organic outreach. No ad budget required. Instead of interrupting strangers, we build genuine relationships that convert - and those connections stay in your network permanently.",
  },
];

// ─── Contact Form ─────────────────────────────────────────────────
function ContactForm() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Service unavailable. Please try again.");
      await actor.submitLead(data.name, data.email, data.message);
    },
    onSuccess: () => {
      toast.success("Thanks! I'll be in touch within 24 hours.", {
        description: "Looking forward to learning about your goals.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (err: Error) => {
      toast.error("Something went wrong.", { description: err.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label
          htmlFor="name"
          className="text-sm font-accent font-semibold text-foreground/80 uppercase tracking-wider"
        >
          Your Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          placeholder="Jane Smith"
          className="h-12 bg-white border-border focus-visible:ring-gold focus-visible:ring-2 rounded-lg"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="email"
          className="text-sm font-accent font-semibold text-foreground/80 uppercase tracking-wider"
        >
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((p) => ({ ...p, email: e.target.value }))
          }
          placeholder="jane@yourcompany.com"
          className="h-12 bg-white border-border focus-visible:ring-gold focus-visible:ring-2 rounded-lg"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label
          htmlFor="message"
          className="text-sm font-accent font-semibold text-foreground/80 uppercase tracking-wider"
        >
          Tell Me About Your Goals
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((p) => ({ ...p, message: e.target.value }))
          }
          placeholder="What are you looking to achieve? Who's your ideal client? What's your main challenge right now?"
          className="min-h-[130px] bg-white border-border focus-visible:ring-gold focus-visible:ring-2 rounded-lg resize-none"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full h-12 bg-gold text-ink font-accent font-bold text-base hover:opacity-90 transition-opacity rounded-lg"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Booking URL hook ─────────────────────────────────────────────
function useBookingUrl() {
  const { actor, isFetching } = useActor();
  const { data } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteConfig();
    },
    enabled: !!actor && !isFetching,
  });
  return data?.bookingUrl || "#contact";
}

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bookingUrl = useBookingUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />

      {/* ── Sticky Nav ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-semibold text-xl tracking-tight"
            style={{ color: scrolled ? "oklch(var(--ink))" : "white" }}
          >
            ShashiRekha K
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <button
                type="button"
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className={`text-sm font-accent font-semibold tracking-wide hover:text-gold transition-colors ${
                  scrolled
                    ? "text-foreground/70 hover:text-ink"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => {
                if (bookingUrl !== "#contact") {
                  window.open(bookingUrl, "_blank");
                } else {
                  scrollTo("#contact");
                }
              }}
              className="bg-gold text-ink font-accent font-bold text-sm hover:opacity-90 transition-opacity h-9 px-5 rounded-full"
            >
              Book a Call
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            style={{ color: scrolled ? "oklch(var(--ink))" : "white" }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-border px-6 pb-5 pt-3 shadow-lg"
            >
              {NAV_LINKS.map((l) => (
                <button
                  type="button"
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="block w-full text-left py-3 text-sm font-accent font-semibold text-foreground/70 hover:text-ink border-b border-border/50 last:border-0"
                >
                  {l.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (bookingUrl !== "#contact")
                    window.open(bookingUrl, "_blank");
                  else scrollTo("#contact");
                }}
                className="mt-4 w-full bg-gold text-ink font-accent font-bold rounded-full"
              >
                Book a Call
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-hero-mesh noise-overlay min-h-screen flex items-center overflow-hidden">
        {/* Decorative dots */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 container max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-accent font-semibold tracking-widest uppercase text-white/80 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  LinkedIn Lead Generation Expert
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mb-6"
              >
                Don't Run After Clients{" "}
                <span className="text-gold">Let Them Line Up</span> for You.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg"
              >
                I build Done-For-You LinkedIn engines that book qualified sales
                calls on autopilot - no cold calling, no ad spend, and zero
                manual outreach required.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    if (bookingUrl !== "#contact")
                      window.open(bookingUrl, "_blank");
                    else scrollTo("#contact");
                  }}
                  className="h-12 px-7 bg-gold text-ink font-accent font-bold text-base rounded-full hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollTo("#results")}
                  className="h-12 px-7 border-white/30 text-white bg-transparent hover:bg-white/10 font-accent font-semibold text-base rounded-full transition-all"
                >
                  See My Results
                </Button>
              </motion.div>
            </motion.div>

            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute inset-[-16px] rounded-3xl border border-white/10" />
                <div
                  className="w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-3xl overflow-hidden relative"
                  style={{
                    border: "1px solid oklch(1 0 0 / 0.12)",
                    boxShadow:
                      "0 32px 80px oklch(0.12 0.04 265 / 0.6), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                  }}
                >
                  <img
                    src="/assets/uploads/WhatsApp-Image-2026-02-28-at-19.45.30-1-1.jpeg"
                    alt="ShashiRekha K"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gold accent corner */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                    style={{ background: "oklch(var(--gold))" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center mt-12 lg:mt-16"
          >
            <button
              type="button"
              onClick={() => scrollTo("#stats")}
              className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
            >
              <span className="text-xs font-accent tracking-widest uppercase">
                Scroll
              </span>
              <ChevronDown size={16} className="animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────── */}
      <section id="stats" className="bg-ink py-10 border-y border-white/5">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0"
          >
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className={`text-center ${idx < STATS.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <div className="font-display text-3xl font-semibold text-gold leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-white/50 text-sm font-accent tracking-wide">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-section-alt">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp}>
                <span className="text-xs font-accent font-bold tracking-widest uppercase text-gold mb-3 block">
                  About Me
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="section-heading text-3xl sm:text-4xl text-ink mb-6 leading-tight"
              >
                Hi, I'm ShashiRekha -{" "}
                <span className="gold-underline">
                  Your LinkedIn Growth Partner
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-foreground/70 text-lg leading-relaxed mb-5"
              >
                I'm a LinkedIn lead generation specialist dedicated to helping
                coaches, consultants, and service providers land high-ticket
                clients through strategic, relationship-first outreach. No
                gimmicks, no spray-and-pray messaging - just intelligent systems
                built around your specific offer and audience.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-foreground/70 text-lg leading-relaxed"
              >
                I've spent three years perfecting outreach systems that work
                quietly in the background while you focus on what you're
                actually great at - delivering exceptional results for your
                clients. Your calendar should fill itself. Let's make that
                happen.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="h-11 px-7 bg-ink text-primary-foreground font-accent font-bold rounded-full hover:opacity-85 transition-opacity"
                >
                  Let's Talk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Decorative feature list */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "150+", label: "Happy Clients" },
                { num: "3+", label: "Years of Experience" },
                { num: "10K+", label: "Leads Delivered" },
                { num: "98%", label: "Client Retention" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="font-display text-4xl font-semibold text-gold mb-2">
                    {item.num}
                  </div>
                  <div className="text-sm font-accent font-semibold text-foreground/60">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              Services
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-ink"
            >
              What I Do For You
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-foreground/60 text-lg mt-4 max-w-xl mx-auto leading-relaxed"
            >
              Three core pillars that turn your LinkedIn presence into a
              client-acquisition machine.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-7"
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-section-alt rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "oklch(var(--gold) / 0.12)" }}
                >
                  <s.icon className="text-gold w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-3">
                  {s.title}
                </h3>
                <p className="text-foreground/65 leading-relaxed text-sm">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────── */}
      <section className="py-24 bg-section-dark">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              Process
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-white"
            >
              How It Works
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-white/10" />

            {STEPS.map((step) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-display text-2xl font-semibold text-ink relative z-10"
                  style={{ background: "oklch(var(--gold))" }}
                >
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Results ────────────────────────────────────────────── */}
      <section id="results" className="py-24 bg-section-alt">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              Results
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-ink"
            >
              Real Results for Real Clients
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-foreground/60 text-lg mt-4 max-w-xl mx-auto leading-relaxed"
            >
              These aren't projections. They're outcomes from real partnerships.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-7"
          >
            {RESULTS.map((r) => (
              <motion.div
                key={r.headline}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${r.color}18` }}
                >
                  <r.icon style={{ color: r.color }} className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink mb-2 leading-tight">
                  {r.headline}
                </h3>
                <p className="text-sm font-accent text-foreground/50">
                  {r.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-ink">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              Testimonials
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-white"
            >
              What My Clients Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-7"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="bg-ink-muted rounded-2xl p-7 border border-white/8 relative"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
                    <Star key={k} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                {/* Quote mark */}
                <div className="absolute top-5 right-6 font-display text-6xl leading-none opacity-10 text-gold pointer-events-none select-none">
                  "
                </div>
                <p className="text-white/75 leading-relaxed text-sm mb-6 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-accent font-bold text-ink"
                    style={{ background: "oklch(var(--gold))" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-accent font-semibold">
                      {t.name}
                    </div>
                    <div className="text-white/45 text-xs font-accent">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Work With Me ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              Why ShashiRekha
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-ink"
            >
              Why Work With Me
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {WHY_ITEMS.map((w) => (
              <motion.div
                key={w.title}
                variants={fadeUp}
                className="text-center p-7"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "oklch(var(--gold) / 0.1)" }}
                >
                  <w.icon className="text-gold w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  {w.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 bg-section-alt">
        <div className="container max-w-2xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
            >
              FAQ
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="section-heading text-3xl sm:text-4xl text-ink"
            >
              Common Questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.q}
                  value={faq.q}
                  className="bg-white rounded-xl border border-border shadow-card px-6"
                >
                  <AccordionTrigger className="text-left font-accent font-semibold text-ink hover:no-underline py-5 text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/65 leading-relaxed pb-5 text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── Contact / CTA ──────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-ink relative overflow-hidden">
        {/* Decorative bg element */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(var(--gold)), transparent)",
          }}
        />

        <div className="relative z-10 container max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left — copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="text-white"
            >
              <motion.span
                variants={fadeUp}
                className="text-xs font-accent font-bold tracking-widest uppercase text-gold block mb-3"
              >
                Get in Touch
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="section-heading text-3xl sm:text-4xl text-white mb-5"
              >
                Ready to Fill Your Calendar?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/65 text-lg leading-relaxed mb-8"
              >
                Book a free 30-minute strategy call. No pressure, no hard sell -
                just a real conversation about your goals and how we can achieve
                them together.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                {[
                  "Understand your offer and audience",
                  "Identify your biggest growth lever on LinkedIn",
                  "Walk away with a clear action plan",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(var(--gold) / 0.15)" }}
                    >
                      <Check size={11} className="text-gold" />
                    </div>
                    <span className="text-white/70 text-sm font-accent">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-ink"
            >
              <h3 className="font-display text-xl font-semibold text-ink mb-6">
                Send Me a Message
              </h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-section-dark border-t border-white/5 py-10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-semibold text-white">
                ShashiRekha K
              </p>
              <p className="text-white/40 text-xs font-accent mt-0.5">
                LinkedIn Lead Generation
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-white/35 font-accent">
              <span>
                © {new Date().getFullYear()} ShashiRekha K. All rights reserved.
              </span>
              <span className="hidden sm:inline">·</span>
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
