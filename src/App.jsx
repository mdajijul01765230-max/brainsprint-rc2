import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    question: "বাংলাদেশের রাজধানী কোনটি?",
    options: ["চট্টগ্রাম", "ঢাকা", "খুলনা", "রাজশাহী"],
    answer: "ঢাকা",
    category: "General Knowledge",
  },
  {
    question: "5 × 6 = কত?",
    options: ["25", "30", "35", "40"],
    answer: "30",
    category: "Math",
  },
  {
    question: "পৃথিবীর উপগ্রহ কোনটি?",
    options: ["সূর্য", "মঙ্গল", "চাঁদ", "শুক্র"],
    answer: "চাঁদ",
    category: "Science",
  },
  {
    question: "বাংলা ভাষার প্রথম মাস কোনটি?",
    options: ["বৈশাখ", "জ্যৈষ্ঠ", "চৈত্র", "ফাল্গুন"],
    answer: "বৈশাখ",
    category: "Bangla",
  },
  {
    question: "10 + 15 = কত?",
    options: ["20", "25", "30", "35"],
    answer: "25",
    category: "Math",
  },
  {
    question: "সূর্য কোন দিক থেকে ওঠে?",
    options: ["পশ্চিম", "উত্তর", "পূর্ব", "দক্ষিণ"],
    answer: "পূর্ব",
    category: "Science",
  },
  {
    question: "বাংলাদেশের জাতীয় ফুল কোনটি?",
    options: ["গোলাপ", "শাপলা", "জবা", "বেলি"],
    answer: "শাপলা",
    category: "General Knowledge",
  },
  {
    question: "এক সপ্তাহে কয় দিন?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    category: "General Knowledge",
  },
  {
    question: "2² = কত?",
    options: ["2", "4", "6", "8"],
    answer: "4",
    category: "Math",
  },
  {
    question: "পানির রাসায়নিক সংকেত কোনটি?",
    options: ["CO2", "O2", "H2O", "NaCl"],
    answer: "H2O",
    category: "Science",
  },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState(QUESTIONS);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const question = questions[current];

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return ((current + (answered ? 1 : 0)) / questions.length) * 100;
  }, [current, answered, questions.length]);

  function startGame() {
    setQuestions(shuffle(QUESTIONS));
    setCurrent(0);
    setScore(0);
    setCorrect(0);
    setSelected(null);
    setAnswered(false);
    setScreen("game");
  }

  function chooseAnswer(option) {
    if (answered) return;

    setSelected(option);
    setAnswered(true);

    if (option === question.answer) {
      setScore((value) => value + 10);
      setCorrect((value) => value + 1);
    }
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setScreen("result");
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
    setAnswered(false);
  }

  function getButtonClass(option) {
    if (!answered) return "answer-button";

    if (option === question.answer) {
      return "answer-button correct";
    }

    if (option === selected) {
      return "answer-button wrong";
    }

    return "answer-button disabled";
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          min-height: 100%;
          width: 100%;
        }

        body {
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #07111f;
          color: #ffffff;
        }

        button {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(45, 212, 191, 0.14), transparent 32%),
            radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.16), transparent 32%),
            #07111f;
        }

        .container {
          width: 100%;
          max-width: 620px;
          min-height: 100vh;
          margin: 0 auto;
          padding: 18px;
          display: flex;
          flex-direction: column;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 23px;
          background: linear-gradient(135deg, #14b8a6, #2563eb);
          box-shadow: 0 8px 25px rgba(20, 184, 166, 0.22);
        }

        .brand-name {
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .brand-subtitle {
          color: #8da1b8;
          font-size: 11px;
          margin-top: 2px;
        }

        .score-pill {
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 700;
          color: #d9fdf7;
        }

        .hero {
          margin-top: 8px;
          padding: 28px 22px;
          border-radius: 26px;
          background:
            linear-gradient(
              145deg,
              rgba(20,184,166,0.18),
              rgba(37,99,235,0.16)
            );
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .hero-badge {
          display: inline-flex;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(20,184,166,0.15);
          color: #5eead4;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .hero h1 {
          font-size: clamp(31px, 8vw, 48px);
          line-height: 1.05;
          margin: 0 0 12px;
          letter-spacing: -1.5px;
        }

        .hero p {
          color: #9db0c7;
          line-height: 1.65;
          margin: 0 0 24px;
          font-size: 15px;
        }

        .primary-button {
          width: 100%;
          border: 0;
          border-radius: 16px;
          padding: 16px 18px;
          background: linear-gradient(135deg, #14b8a6, #2563eb);
          color: white;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(37,99,235,0.22);
          transition: transform 0.15s ease;
        }

        .primary-button:active {
          transform: scale(0.98);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        .stat {
          padding: 16px 10px;
          text-align: center;
          border-radius: 18px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .stat-value {
          font-size: 22px;
          font-weight: 850;
        }

        .stat-label {
          color: #8093aa;
          font-size: 11px;
          margin-top: 4px;
        }

        .section-title {
          margin: 26px 2px 12px;
          font-size: 16px;
          font-weight: 800;
        }

        .feature-list {
          display: grid;
          gap: 9px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.07);
          font-size: 19px;
        }

        .feature strong {
          display: block;
          font-size: 14px;
        }

        .feature span {
          display: block;
          color: #8194aa;
          font-size: 12px;
          margin-top: 3px;
        }

        .game-card {
          padding: 20px;
          border-radius: 24px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .question-number {
          color: #8da1b8;
          font-size: 13px;
          font-weight: 700;
        }

        .category {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(20,184,166,0.12);
          color: #5eead4;
          font-size: 11px;
          font-weight: 800;
        }

        .progress-track {
          height: 7px;
          background: rgba(255,255,255,0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 28px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #14b8a6, #3b82f6);
          border-radius: inherit;
          transition: width 0.25s ease;
        }

        .question {
          font-size: clamp(24px, 6vw, 32px);
          line-height: 1.25;
          letter-spacing: -0.5px;
          margin: 0 0 22px;
        }

        .answers {
          display: grid;
          gap: 11px;
        }

        .answer-button {
          width: 100%;
          padding: 16px;
          text-align: left;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.055);
          color: white;
          cursor: pointer;
          font-weight: 650;
          transition: transform 0.12s ease, background 0.15s ease;
        }

        .answer-button:active {
          transform: scale(0.985);
        }

        .answer-button.correct {
          background: rgba(34,197,94,0.18);
          border-color: rgba(34,197,94,0.6);
        }

        .answer-button.wrong {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.6);
        }

        .answer-button.disabled {
          opacity: 0.52;
          cursor: default;
        }

        .feedback {
          margin-top: 17px;
          padding: 13px 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          color: #c9d6e5;
          font-size: 13px;
          line-height: 1.5;
        }

        .feedback strong {
          color: white;
        }

        .next-button {
          width: 100%;
          margin-top: 12px;
          padding: 15px;
          border: 0;
          border-radius: 15px;
          background: white;
          color: #07111f;
          font-weight: 850;
          cursor: pointer;
        }

        .result {
          text-align: center;
          padding: 30px 20px;
          border-radius: 25px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .result-icon {
          font-size: 58px;
          margin-bottom: 8px;
        }

        .result h1 {
          margin: 0 0 8px;
          font-size: 32px;
        }

        .result p {
          color: #8da1b8;
          line-height: 1.6;
        }

        .final-score {
          font-size: 52px;
          font-weight: 900;
          margin: 22px 0 5px;
          background: linear-gradient(135deg, #5eead4, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .final-label {
          color: #8da1b8;
          font-size: 13px;
          margin-bottom: 25px;
        }

        .footer {
          margin-top: auto;
          padding-top: 26px;
          text-align: center;
          color: #53657b;
          font-size: 11px;
        }

        @media (max-width: 380px) {
          .container {
            padding: 13px;
          }

          .hero {
            padding: 22px 17px;
          }

          .stats {
            gap: 7px;
          }

          .stat {
            padding: 13px 7px;
          }
        }
      `}</style>

      <main className="app">
        <div className="container">
          <header className="topbar">
            <div className="brand">
              <div className="brand-icon">🧠</div>
              <div>
                <div className="brand-name">BrainSprint</div>
                <div className="brand-subtitle">Think • Learn • Sprint</div>
              </div>
            </div>

            {screen === "game" && (
              <div className="score-pill">⭐ {score}</div>
            )}
          </header>

          {screen === "home" && (
            <>
              <section className="hero">
                <div className="hero-badge">⚡ QUICK BRAIN CHALLENGE</div>

                <h1>Ready to test your brain?</h1>

                <p>
                  Answer fast, learn something new, and build your score.
                  Every round is a new BrainSprint challenge.
                </p>

                <button className="primary-button" onClick={startGame}>
                  ▶ Start BrainSprint
                </button>
              </section>

              <div className="stats">
                <div className="stat">
                  <div className="stat-value">10</div>
                  <div className="stat-label">Questions</div>
                </div>

                <div className="stat">
                  <div className="stat-value">+10</div>
                  <div className="stat-label">Per Correct</div>
                </div>

                <div className="stat">
                  <div className="stat-value">∞</div>
                  <div className="stat-label">Replay</div>
                </div>
              </div>

              <div className="section-title">What you can do</div>

              <div className="feature-list">
                <div className="feature">
                  <div className="feature-icon">🎯</div>
                  <div>
                    <strong>Challenge Yourself</strong>
                    <span>Test your knowledge with quick questions.</span>
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">📈</div>
                  <div>
                    <strong>Build Your Score</strong>
                    <span>Correct answers increase your points.</span>
                  </div>
                </div>

                <div className="feature">
                  <div className="feature-icon">🔁</div>
                  <div>
                    <strong>Play Again</strong>
                    <span>Every new round shuffles the questions.</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {screen === "game" && question && (
            <section className="game-card">
              <div className="game-header">
                <div className="question-number">
                  Question {current + 1} / {questions.length}
                </div>

                <div className="category">
                  {question.category}
                </div>
              </div>

              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <h1 className="question">{question.question}</h1>

              <div className="answers">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={getButtonClass(option)}
                    onClick={() => chooseAnswer(option)}
                    disabled={answered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {answered && (
                <>
                  <div className="feedback">
                    {selected === question.answer ? (
                      <>
                        🎉 <strong>Correct!</strong> Great job. You earned
                        +10 points.
                      </>
                    ) : (
                      <>
                        💡 <strong>Not quite.</strong> The correct answer is{" "}
                        <strong>{question.answer}</strong>.
                      </>
                    )}
                  </div>

                  <button className="next-button" onClick={nextQuestion}>
                    {current + 1 === questions.length
                      ? "See Result"
                      : "Next Question →"}
                  </button>
                </>
              )}
            </section>
          )}

          {screen === "result" && (
            <section className="result">
              <div className="result-icon">🏆</div>

              <h1>Round Complete!</h1>

              <p>
                You completed the BrainSprint challenge.
                <br />
                Keep playing to improve your knowledge.
              </p>

              <div className="final-score">{score}</div>
              <div className="final-label">TOTAL POINTS</div>

              <div className="stats">
                <div className="stat">
                  <div className="stat-value">{correct}</div>
                  <div className="stat-label">Correct</div>
                </div>

                <div className="stat">
                  <div className="stat-value">
                    {questions.length - correct}
                  </div>
                  <div className="stat-label">Missed</div>
                </div>

                <div className="stat">
                  <div className="stat-value">
                    {Math.round((correct / questions.length) * 100)}%
                  </div>
                  <div className="stat-label">Accuracy</div>
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <button className="primary-button" onClick={startGame}>
                  🔄 Play Again
                </button>
              </div>

              <div style={{ marginTop: 10 }}>
                <button
                  className="next-button"
                  onClick={() => setScreen("home")}
                >
                  ← Back to Home
                </button>
              </div>
            </section>
          )}

          <footer className="footer">
            BrainSprint • Mobile-first learning game
          </footer>
        </div>
      </main>
    </>
  );
}
