import { AsciiLogo } from "./AsciiLogo";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/lumora.studio" },
  { label: "Dribbble", href: "https://dribbble.com/lumorastudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/lumora-studio/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.paddingGlobal}>
        <div className={styles.containerLarge}>
          <div className={styles.component}>
            <AsciiLogo className={styles.logo} wordmark="LUMORA" />

            <div className={styles.content}>
              <div className={styles.grid}>
                <div className={`${styles.column} ${styles.columnLocation}`}>
                  <div className={`${styles.textRegular} ${styles.textLight}`}>Location</div>
                  <div className={`${styles.textRegular} ${styles.text1000}`}>
                    Lisbon, Portugal <br />
                    Europe
                  </div>
                </div>

                <div className={styles.colList}>
                  <div className={styles.column}>
                    {NAV_LINKS.map((link, i) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`${styles.link} ${i === 0 ? styles.linkTop : ""} ${
                          i === NAV_LINKS.length - 1 ? styles.linkBot : ""
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <div className={styles.column}>
                    {SOCIAL_LINKS.map((link, i) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${styles.link} ${i === 0 ? styles.linkTop : ""} ${
                          i === SOCIAL_LINKS.length - 1 ? styles.linkBot : ""
                        }`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${styles.grid} ${styles.gridDown}`}>
                <div className={`${styles.column} ${styles.columnLocation}`}>
                  <div className={`${styles.textRegular} ${styles.text1000}`}>© Lumora 2026</div>
                </div>
                <div className={`${styles.colList} ${styles.colListPolitica}`}>
                  <a href="/privacy" className={styles.privacyLink}>
                    Privacy Notice
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
