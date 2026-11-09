import styles from "./page.module.css";
import Image from "next/image";
import { Divider } from "@/components/Divider";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/avatar.jpg"
          alt=""
          width={80}
          height={80}
          className={styles.avatar}
        />
        <h1 className={styles.name}>Jing Chen</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.intro}>
          <p>
            Welcome, I’m Jing, living in Sydney and finishing my Master of IT at
            UNSW soon. I used to work as a product designer for five years.
          </p>
          <p>
            I care about <strong>how a product works</strong> and{" "}
            <strong>how it looks</strong>, and have designed products for many
            businesses in New Zealand and China. Now, I’m looking for a software
            engineering role, in design engineering, frontend or full-stack.
          </p>
        </div>
        <Divider />
        <section className={styles.contact}>
          <h2>Get in touch:</h2>
          <dl>
            <dt>Email</dt>
            <dd>
              <a href="mailto:jing.chen.dev@gmail.com">
                jing.chen.dev@gmail.com
              </a>
            </dd>

            <dt>LinkedIn</dt>
            <dd>
              <a href="https://www.linkedin.com/in/jingchen-dev">
                linkedin.com/in/jingchen-dev
              </a>
            </dd>

            <dt>GitHub</dt>
            <dd>
              <a href="https://github.com/xixifish">github.com/xixifish</a>
            </dd>
          </dl>
          <p>* Full rights to work in AU and NZ. Open to both locations.</p>
          <a href="#">Download CV</a>
        </section>
        <Divider />
        <section>
          <h2>Recently designed and built:</h2>
          <article>
            <h3>Weekly Planner:</h3>
            <p>Makes repeating and tracking tasks much easier.</p>
            <ul>
              <li>
                <a href="https://weekly-planner-jing.vercel.app/">
                  Try it<span className="visually-hidden"> Weekly Planner</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/xixifish/weekly-planner">
                  GitHub<span className="visually-hidden"> Weekly Planner</span>
                </a>
              </li>
              <li>
                <a href="https://www.figma.com/design/PMOiVwojpmtcMso4lWKBma/weekly-planner?node-id=56-1821&t=MXhWDyzFIBZkF6id-1">
                  Figma<span className="visually-hidden"> Weekly Planner</span>
                </a>
              </li>
            </ul>
          </article>
          <article>
            <h3>Popcorn Movie Recommender:</h3>
            <p>Finds a movie to your taste quickly.</p>
            <ul>
              <li>
                <a href="https://popcorn-jing.vercel.app/">
                  Try it
                  <span className="visually-hidden">
                    {" "}
                    Popcorn Movie Recommender
                  </span>
                </a>
              </li>
              <li>
                <a href="https://github.com/xixifish/movie-recommender">
                  GitHub
                  <span className="visually-hidden">
                    {" "}
                    Popcorn Movie Recommender
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.figma.com/design/moBbyis5f87CvI4eKIdd2e/movie-recommender?node-id=273-2270&t=3">
                  Figma
                  <span className="visually-hidden">
                    {" "}
                    Popcorn Movie Recommender
                  </span>
                </a>
              </li>
            </ul>
          </article>
        </section>
      </main>
      <footer>
        <p>
          Busy updating this website. View the source on{" "}
          <a href="https://github.com/xixifish/personal-website">GitHub</a>. ©
          2026 Jing Chen
        </p>
      </footer>
    </div>
  );
}
