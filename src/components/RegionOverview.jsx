export default function RegionOverview() {
  return (
    <div className="region-overview">
      <div className="region-intro" data-reveal="up">
        <p className="eyebrow">South India Operations Grid</p>
        <h3>Rooted locally.<br /><em>Remarkable everywhere.</em></h3>
        <p>We have handled flagship events in major convention centers, stadiums, beaches and private estates across our key operational metros.</p>
        <span className="region-status"><i /> Active Crew Logistics</span>
      </div>
      <figure className="region-map" data-reveal="up">
        <picture>
          <source media="(max-width: 639px)" srcSet="/images/map%20mobile.png" />
          <img src="/images/map.png" alt="Map showing Jan 08 Celebrations service areas across Kerala, Tamil Nadu and Karnataka" loading="lazy" />
        </picture>
      </figure>
    </div>
  );
}
