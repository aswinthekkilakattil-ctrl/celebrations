import { ArrowDown, ArrowUpRight } from 'lucide-react';
import CountUp from './CountUp';

const HERO_VIDEO = '/videos/Live_music_concert_at_night_20261018220143-cleaned.mp4';
const PARTICLES = Array.from({ length: 16 }, (_, index) => ({
  left: `${12 + (index * 29) % 82}%`,
  top: `${8 + (index * 17) % 84}%`,
  size: `${index % 3 === 0 ? 3 : 2}px`,
  duration: `${8 + index % 6}s`,
  delay: `${-(index * 1.7)}s`,
}));

export default function Hero({ onNavigate }) {
  return (
    <>
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow hero-label"><span /> Events. People. Extraordinary moments.</p>
            <h1 id="hero-title" className="hero-heading">
              <span className="hero-line hero-line--first">Crafting</span>
              <span className="hero-line hero-line--second">extraordinary</span>
              <span className="hero-line hero-line--gold">celebrations.</span>
            </h1>
            <p className="hero-accent">Experiences that last forever.</p>
            <p className="hero-description">
              From extraordinary corporate gatherings to unforgettable celebrity celebrations,
              we transform ambitious ideas into remarkable experiences across Kerala, Tamil Nadu and Karnataka.
            </p>
            <div className="hero-actions">
              <button className="button-gold" onClick={() => onNavigate('contact')}>
                Plan Your Event <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <button className="button-outline" onClick={() => onNavigate('portfolio')}>
                Explore Our Experiences <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="hero-locations"><span>Kerala</span><i /><span>Tamil Nadu</span><i /><span>Karnataka</span></div>
          </div>
          <figure className="hero-visual">
            <video src={HERO_VIDEO} autoPlay muted loop playsInline
              poster="/images/hero-gala.jpg"
              aria-label="Live music concert at night with dramatic stage lighting" />
            <div className="hero-visual-shade" />
            <div className="hero-light" />
            <div className="hero-particles" aria-hidden="true">
              {PARTICLES.map((particle, index) => (
                <span key={index} style={{ left: particle.left, top: particle.top,
                  '--particle-size': particle.size, '--particle-duration': particle.duration,
                  '--particle-delay': particle.delay }} />
              ))}
            </div>
            <figcaption><span>JINNO8 CELEBRATIONS</span></figcaption>
          </figure>
          <button className="hero-scroll" onClick={() => onNavigate('showcase-video')}>
            <ArrowDown size={16} aria-hidden="true" /> Scroll to discover
          </button>
        </div>
      </section>
      <section className="signature-stats" aria-label="Our production strengths">
        <div className="site-container stats-layout">
          <div className="stats-intro" data-reveal="up"><span className="eyebrow">A singular vision.</span><p>Every detail.<br /><em>Entirely ours.</em></p></div>
          <div className="hero-stats">
            <div data-reveal="up"><span><CountUp value={100} suffix="%" /></span><span>In-House Inventory</span></div>
            <div data-reveal="up" data-reveal-delay="70"><span><CountUp value={3} suffix=" States" /></span><span>Direct Operational Fleet</span></div>
            <div data-reveal="up" data-reveal-delay="140"><span>End-to-End</span><span>Concept to Curtain</span></div>
            <div data-reveal="up" data-reveal-delay="210"><span>Zero</span><span>Vendor Scramble</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
