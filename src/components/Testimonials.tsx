import React, { useState, useEffect, useRef } from 'react';
import { TestimonialItem } from '../types/legal';
import { TESTIMONIALS } from '../data/legalData';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  LayoutGrid,
  SlidersHorizontal,
  ShieldCheck,
  Play,
  Pause,
  MapPin,
  Calendar,
  ArrowRight,
  Scale,
} from 'lucide-react';

interface TestimonialsProps {
  onOpenConsultation?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenConsultation }) => {
  const [layoutMode, setLayoutMode] = useState<'carousel' | 'grid'>('carousel');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    'All',
    'Property & Land Title',
    'Commercial & Corporate',
    'Litigation & Debt Recovery',
    'Energy & Industrial',
  ];

  const filteredTestimonials = activeCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === activeCategory);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Autoplay handler for carousel
  useEffect(() => {
    if (layoutMode !== 'carousel' || !isPlaying || isHovered || filteredTestimonials.length <= 1) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [layoutMode, isPlaying, isHovered, filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % filteredTestimonials.length
    );
  };

  const currentItem: TestimonialItem | undefined = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Client Feedback &amp; Success Stories</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span>Commercial &amp; Property Mandates</span>
          </div>
          <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-white leading-tight">
            Proven Legal Outcomes for Nigerian Business Leaders
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Read verified reviews from property developers, manufacturers, and corporate entities represented by Barrister Oladimeji Ogun and the chambers litigation and transactional teams.
          </p>
        </div>

        {/* Layout Switcher: Carousel vs Grid */}
        <div className="flex items-center gap-1 p-1 bg-[#070e1b] border border-blue-900/60 rounded-xl self-start lg:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => setLayoutMode('carousel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              layoutMode === 'carousel'
                ? 'bg-[#0f2144] text-amber-400 font-semibold shadow-sm border border-blue-800'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Carousel Slider View"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Carousel</span>
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              layoutMode === 'grid'
                ? 'bg-[#0f2144] text-amber-400 font-semibold shadow-sm border border-blue-800'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid Layout</span>
          </button>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all border cursor-pointer ${
                isActive
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/50 font-bold shadow-sm'
                  : 'bg-[#0a162e]/60 text-slate-300 hover:text-white border-blue-900/50 hover:border-blue-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. CAROUSEL LAYOUT */}
      {layoutMode === 'carousel' && currentItem && (
        <div
          className="relative bg-[#0a162e] border-2 border-blue-900/50 rounded-3xl p-6 sm:p-10 lg:p-12 transition-all shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                {currentItem.category}
              </span>
            </div>

            {/* Counter and Autoplay control */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200">Verified Client Mandate</span>
              </div>
              <span aria-hidden="true" className="text-blue-900">|</span>
              <span className="font-mono tabular-nums text-slate-200 font-semibold">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filteredTestimonials.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg hover:bg-[#0f2144] text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Testimonial Core Body */}
          <div className="py-8 space-y-6">
            
            {/* Success Outcome Strip */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-blue-950/80 via-[#0a1b38] to-blue-950/80 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-amber-300">
                  Key Result: {currentItem.outcomeHighlight}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
                  {currentItem.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400/80" />
                  Mandate Year: {currentItem.verifiedMandateYear}
                </span>
              </div>
            </div>

            {/* Quote with Quotation Symbol */}
            <div className="relative pt-2">
              <Quote className="w-10 h-10 text-amber-400/20 absolute -top-4 -left-2 -z-0" />
              <p className="relative z-10 text-base sm:text-lg lg:text-xl text-white font-serif-heading leading-relaxed italic">
                "{currentItem.quote}"
              </p>
            </div>

            {/* Client Credentials & Role */}
            <div className="pt-4 border-t border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-semibold text-white text-base">
                  {currentItem.author}
                </div>
                <div className="text-xs text-amber-400 font-medium">
                  {currentItem.role} · <span className="text-slate-300">{currentItem.organization}</span>
                </div>
              </div>

              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <span>Inquire on Similar Matter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Carousel Navigation Footer */}
          <div className="pt-6 border-t border-blue-900/50 flex items-center justify-between gap-4">
            
            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentIndex
                      ? 'w-7 bg-amber-400 shadow-sm shadow-amber-400/40'
                      : 'w-2 bg-blue-900/80 hover:bg-blue-700'
                  }`}
                  aria-label={`Jump to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Next / Previous Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-[#0f2144] hover:bg-[#163060] text-slate-200 border border-blue-800 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold transition-all shadow-md cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 4. GRID LAYOUT */}
      {layoutMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#0a162e]/80 border border-blue-900/50 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-5 shadow-lg"
            >
              <div className="space-y-4">
                
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-400 font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Outcome Pill Box */}
                <div className="p-2.5 rounded-lg bg-blue-950/70 border border-amber-400/30 text-xs font-semibold text-amber-300 leading-snug">
                  Outcome: {item.outcomeHighlight}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{item.quote}"
                </p>

              </div>

              {/* Author & Footer */}
              <div className="pt-4 border-t border-blue-900/50 space-y-1">
                <div className="text-xs font-semibold text-white">
                  {item.author}
                </div>
                <div className="text-[11px] text-amber-400 font-medium">
                  {item.role}
                </div>
                <div className="text-[11px] text-slate-300">
                  {item.organization}
                </div>
                <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                  <span>{item.location}</span>
                  <span>{item.verifiedMandateYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
