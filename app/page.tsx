import { ThreeBackdrop } from "./ThreeBackdrop";
import { soundCloudProfile, tracks } from "./tracks";

const featured = tracks.slice(0, 6);
const setsCount = tracks.filter((track) => track.type === "Set").length;
const trackCount = tracks.length - setsCount;
const playerUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  soundCloudProfile.url,
)}&color=%23c7ff37&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;
const officialLinks = [
  {
    title: "Booking",
    label: "koi.boibooking@gmail.com",
    url: "mailto:koi.boibooking@gmail.com",
    tone: "primary",
  },
  {
    title: "Beatport",
    label: "Releases and DJ store",
    url: "https://www.beatport.com/artist/koi-boi/230769/releases?page=1&per_page=25",
    tone: "store",
  },
  {
    title: "Apple Music",
    label: "Stream Koi Boi",
    url: "https://music.apple.com/us/artist/koi-boi/484391276",
    tone: "stream",
  },
  {
    title: "SoundCloud",
    label: "Official music catalog",
    url: soundCloudProfile.url,
    tone: "stream",
  },
  {
    title: "Instagram",
    label: "@koiboi_edit_",
    url: "https://www.instagram.com/koiboi_edit_/?hl=en",
    tone: "social",
  },
  {
    title: "Studio AI",
    label: "KOIBOI Studio site",
    url: "https://koiboi-studio.github.io/studio-ai-landing/?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    tone: "site",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <ThreeBackdrop />

      <section className="hero" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="Primary">
          <a className="brand" href="#top" aria-label="KOIBOI MUSIC home">
            KOIBOI
          </a>
          <div className="nav-actions">
            <a className="pill" href="#player">
              Play
            </a>
            <a className="pill pill--accent" href="mailto:koi.boibooking@gmail.com">
              Booking
            </a>
          </div>
        </nav>

        <div className="hero__copy">
          <p className="eyebrow">Official Artist Hub</p>
          <h1 id="hero-title">KOIBOI MUSIC</h1>
          <p className="lead">
            Psytrance releases, live sets, remixes, bookings and official platform links in one clean place.
          </p>
          <div className="stats" aria-label="SoundCloud catalog summary">
            <span>{soundCloudProfile.count} items</span>
            <span>{trackCount} tracks</span>
            <span>{setsCount} sets</span>
          </div>
          <div className="actions" aria-label="Primary actions">
            <a className="button button--primary" href="#player">
              Listen Now
            </a>
            <a className="button button--ghost" href="#links">
              Links
            </a>
          </div>
        </div>

        <div className="portrait-wrap" aria-hidden="true">
          <img className="portrait" src="/koi-boi-portrait.jpg" alt="" />
        </div>
      </section>

      <section className="ticker" aria-label="Featured music">
        {featured.map((track) => (
          <a key={track.url} href={track.url}>
            {track.title}
          </a>
        ))}
      </section>

      <section className="panel player-panel" id="player" aria-labelledby="player-title">
        <p className="section-kicker">Full Player</p>
        <h2 id="player-title">{soundCloudProfile.title}</h2>
        <iframe
          title="KOIBOI SoundCloud player"
          className="soundcloud-player"
          allow="autoplay"
          src={playerUrl}
        />
        <a className="button button--primary button--wide" href={soundCloudProfile.url}>
          Open Full Profile
        </a>
      </section>

      <section className="panel" aria-labelledby="catalog-title">
        <div className="section-row">
          <div>
            <p className="section-kicker">Catalog</p>
            <h2 id="catalog-title">All music from SoundCloud</h2>
          </div>
          <span className="count-badge">{tracks.length}</span>
        </div>
        <div className="track-list">
          {tracks.map((track, index) => (
            <article className="track" key={track.url}>
              <span className="track__index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{track.title}</h3>
                <p>{track.type}</p>
              </div>
              <a className="track__play" href={track.url} aria-label={`Play ${track.title} on SoundCloud`}>
                Play
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="panel links-panel" id="links" aria-labelledby="links-title">
        <p className="section-kicker">Official Links</p>
        <h2 id="links-title">All platforms, booking and artist channels.</h2>
        <div className="link-grid">
          {officialLinks.map((link) => (
            <a className={`link-card link-card--${link.tone}`} href={link.url} key={link.url}>
              <span>{link.title}</span>
              <strong>{link.label}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="booking" id="book" aria-labelledby="book-title">
        <p className="section-kicker">Booking / Collabs</p>
        <h2 id="book-title">For live sets, releases, remixes and sound design.</h2>
        <p className="booking-mail">koi.boibooking@gmail.com</p>
        <a className="button button--primary button--wide" href="mailto:koi.boibooking@gmail.com">
          Send Booking Request
        </a>
      </section>
    </main>
  );
}
