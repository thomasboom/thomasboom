export default function Work() {
  return (
    <section className="section" id="work">
      <div className="section-header">
        <h2 className="section-title">01 — SELECTED WORK</h2>
        <span className="section-line"></span>
      </div>

      <article className="work-item">
        <h3>
          <a
            href="https://github.com/ThomasNowProductions/YAM-Launcher"
            target="_blank"
            rel="noopener noreferrer"
          >
            YAM Launcher
          </a>
        </h3>
        <p>Yet Another Minimalist launcher for Android</p>
        <div className="tech">
          <span>Kotlin</span>
          <span>Google Play Store</span>
        </div>
      </article>

      <article className="work-item">
        <h3>
          <a
            href="https://github.com/thomasboom/Codenamr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codenamr
          </a>
        </h3>
        <p>A dead simple and lightning fast CLI for generating codenames</p>
        <div className="tech">
          <span>Rust</span>
          <span>CLI</span>
        </div>
      </article>

      <article className="work-item">
        <h3>
          <a
            href="https://supgit.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            SupGit
          </a>
        </h3>
        <p>The Git CLI, simplified.</p>
        <div className="tech">
          <span>Rust</span>
          <span>Git</span>
        </div>
      </article>

      <article className="work-item">
        <h3>
          <a
            href="https://airun-cli.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            AIRun
          </a>
        </h3>
        <p>
          Forgot that you have dozens of AI CLIs installed? Find the one you
          need before executing your prompt
        </p>
        <div className="tech">
          <span>Rust</span>
          <span>CLI</span>
        </div>
      </article>

      <article className="work-item">
        <h3>
          <a
            href="https://bijbelquiz.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            BijbelQuiz
          </a>
        </h3>
        <p>Test your Bible knowledge with engaging quizzes.</p>
        <div className="tech">
          <span>Flutter</span>
          <span>Dart</span>
          <span>Supabase</span>
          <span>Gemini API</span>
        </div>
      </article>
    </section>
  );
}
