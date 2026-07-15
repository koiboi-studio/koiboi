const drops = [
  { title: "Midnight Koi", kind: "New single", time: "02:44" },
  { title: "Studio Parallax", kind: "Live reel", time: "00:31" },
  { title: "Neon Water", kind: "Sound pack", time: "24 loops" },
];

const moments = ["Live Sets", "Sound Design", "Releases", "Custom Scores"];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__backdrop" aria-hidden="true">
          <div className="pulse pulse--lime" />
          <div className="pulse pulse--pink" />
          <div className="orbital orbital--one" />
          <div className="orbital orbital--two" />
        </div>

        <nav className="topbar" aria-label="Primary">
          <a className="brand" href="#top" aria-label="KOIBOI MUSIC home">
            KOIBOI
          </a>
          <a className="pill" href="#book">
            Book
          </a>
        </nav>

        <div className="hero__media" aria-hidden="true">
          <img src="/koi-poster.png" alt="" />
        </div>

        <div className="hero__copy">
          <p className="eyebrow">KOIBOI MUSIC</p>
          <h1 id="hero-title">Bass-forward music with liquid motion.</h1>
          <p className="lead">
            Live sets, releases, and sound design from a neon koi universe.
          </p>
          <div className="actions" aria-label="Primary actions">
            <a className="button button--primary" href="#listen">
              Listen Now
            </a>
            <a className="button button--ghost" href="mailto:booking@koiboi.music">
              Booking
            </a>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="KOIBOI focus areas">
        {moments.map((moment) => (
          <span key={moment}>{moment}</span>
        ))}
      </section>

      <section className="panel" id="listen" aria-labelledby="listen-title">
        <p className="section-kicker">Latest Drops</p>
        <h2 id="listen-title">Designed for swipe, stage, and speakers.</h2>
        <div className="drop-list">
          {drops.map((drop, index) => (
            <article className="drop" key={drop.title}>
              <span className="drop__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{drop.title}</h3>
                <p>{drop.kind}</p>
              </div>
              <span className="drop__time">{drop.time}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="booking" id="book" aria-labelledby="book-title">
        <p className="section-kicker">Next Move</p>
        <h2 id="book-title">Bring the KOIBOI sound to your reel, venue, or launch.</h2>
        <a className="button button--primary button--wide" href="mailto:booking@koiboi.music">
          Start a Project
        </a>
      </section>
    </main>
  );
}
