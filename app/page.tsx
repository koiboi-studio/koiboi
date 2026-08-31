import { soundCloudProfile, tracks } from "./tracks";

const featured = tracks.slice(0, 8);
const setsCount = tracks.filter((track) => track.type === "Set").length;
const trackCount = tracks.length - setsCount;
const visibleTracks = tracks.slice(0, 12);
const archiveTracks = tracks.slice(12);
const playerUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  soundCloudProfile.url,
)}&color=%23c7ff37&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

const sections = [
  { id: "top", num: "01", label: "Index" },
  { id: "player", num: "02", label: "Transmission" },
  { id: "archive", num: "03", label: "Archive" },
  { id: "links", num: "04", label: "Network" },
  { id: "book", num: "05", label: "Contact" },
];

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
    title: "Facebook",
    label: "Official artist page",
    url: "https://www.facebook.com/profile.php?id=61577651219891",
    tone: "facebook",
  },
  {
    title: "Studio AI",
    label: "KOIBOI Studio site",
    url: "https://koiboi-studio.github.io/studio-ai-landing/?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    tone: "site",
  },
];

function TrackRow({ track, index }: { track: (typeof tracks)[number]; index: number }) {
  return (
    <a className="track" href={track.url} data-type={track.type}>
      <span className="track__index">{String(index + 1).padStart(2, "0")}</span>
      <span className="track__title">{track.title}</span>
      <span className="track__type">{track.type}</span>
      <span className="track__play" aria-hidden="true">
        Play <i>↗</i>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />

      <nav className="topbar" aria-label="Primary">
        <a className="brand" href="#top" aria-label="KOIBOI MUSIC home">
          <span className="brand__dot" aria-hidden="true" />
          KOIBOI
          <i>Music</i>
        </a>
        <ol className="topbar__index" aria-label="Sections">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <b>{section.num}</b>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="nav-actions">
          <a className="pill" href="#player">
            Play
          </a>
          <a className="pill pill--accent" href="mailto:koi.boibooking@gmail.com">
            Booking
          </a>
        </div>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">
            <span>01</span> Official Artist Hub <em>/ Est. 2011</em>
          </p>
          <h1 id="hero-title">
            <span>KOI</span>
            <span>BOI</span>
          </h1>
          <p className="hero__sub">Psytrance · Live sets · Sound design</p>
          <p className="lead">
            Releases, live sets, remixes, bookings and official platform links —
            one signal, one place.
          </p>
          <dl className="stats" aria-label="SoundCloud catalog summary">
            <div>
              <dt>Items</dt>
              <dd>{soundCloudProfile.count}</dd>
            </div>
            <div>
              <dt>Tracks</dt>
              <dd>{trackCount}</dd>
            </div>
            <div>
              <dt>Sets</dt>
              <dd>{setsCount}</dd>
            </div>
          </dl>
          <div className="actions" aria-label="Primary actions">
            <a className="button button--primary" href="#player">
              Listen Now <span aria-hidden="true">↗</span>
            </a>
            <a className="button button--ghost" href="#links">
              All Links
            </a>
          </div>
        </div>

        <figure className="portrait-scene">
          <img className="portrait" src="/koi-boi-portrait.jpg" alt="Koi Boi" />
          <figcaption>
            <span>KOI BOI</span>
            <i>O00010O</i>
          </figcaption>
        </figure>
      </section>

      <div className="ticker" aria-label="Featured music">
        <div className="ticker__track">
          {[0, 1].map((pass) => (
            <div className="ticker__run" key={pass} aria-hidden={pass === 1}>
              {featured.map((track) => (
                <a key={`${pass}-${track.url}`} href={track.url} tabIndex={pass === 1 ? -1 : undefined}>
                  <i aria-hidden="true">◆</i>
                  {track.title}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="stage player-stage" id="player" aria-labelledby="player-title">
        <header className="stage__head">
          <p className="section-kicker">02 / Transmission</p>
          <h2 id="player-title">
            Listen inside
            <br />
            the signal.
          </h2>
          <p className="stage__note">
            The full catalog streams straight from SoundCloud — {soundCloudProfile.count} items,
            newest first.
          </p>
        </header>
        <div className="player-deck">
          <div className="deck-bar">
            <span>SC / KOI-BOI</span>
            <i>
              <b aria-hidden="true" />
              LIVE STREAM
            </i>
          </div>
          <iframe
            title="KOIBOI SoundCloud player"
            className="soundcloud-player"
            allow="autoplay"
            loading="lazy"
            src={playerUrl}
          />
          <a className="button button--primary button--wide" href={soundCloudProfile.url}>
            Open Full Profile <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="stage catalog-stage" id="archive" aria-labelledby="catalog-title">
        <header className="stage__head stage__head--row">
          <div>
            <p className="section-kicker">03 / Archive</p>
            <h2 id="catalog-title">
              All music.
              <br />
              One frequency.
            </h2>
          </div>
          <p className="count-badge">
            <b>{tracks.length}</b>
            <span>releases indexed</span>
          </p>
        </header>

        <div className="track-list">
          {visibleTracks.map((track, index) => (
            <TrackRow key={track.url} track={track} index={index} />
          ))}
        </div>

        <details className="archive-more">
          <summary>
            <span>Show the full archive</span>
            <b>{archiveTracks.length} more</b>
          </summary>
          <div className="track-list">
            {archiveTracks.map((track, index) => (
              <TrackRow key={track.url} track={track} index={index + visibleTracks.length} />
            ))}
          </div>
        </details>
      </section>

      <section className="stage links-stage" id="links" aria-labelledby="links-title">
        <header className="stage__head">
          <p className="section-kicker">04 / Network</p>
          <h2 id="links-title">
            Enter the
            <br />
            KOIBOI universe.
          </h2>
        </header>
        <div className="link-grid">
          {officialLinks.map((link, index) => (
            <a className={`link-card link-card--${link.tone}`} href={link.url} key={link.url}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{link.title}</span>
              <strong>{link.label}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="stage booking-stage" id="book" aria-labelledby="book-title">
        <div className="booking">
          <p className="section-kicker">05 / Direct channel</p>
          <h2 id="book-title">
            Bring the
            <br />
            signal live.
          </h2>
          <p className="booking-note">
            Bookings, collaborations, remixes and sound design.
          </p>
          <a className="booking-mail" href="mailto:koi.boibooking@gmail.com">
            koi.boibooking@gmail.com
          </a>
          <a className="button button--primary button--wide" href="mailto:koi.boibooking@gmail.com">
            Send Booking Request <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer>
        <span className="footer__brand">KOIBOI MUSIC</span>
        <nav className="footer__links" aria-label="Footer">
          {officialLinks.slice(1).map((link) => (
            <a href={link.url} key={link.url}>
              {link.title}
            </a>
          ))}
        </nav>
        <span>© 2026 / ALL SYSTEMS LIVE</span>
      </footer>
    </main>
  );
}
