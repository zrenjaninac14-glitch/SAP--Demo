"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Lightbulb,
  Mail,
  PencilLine,
  Sparkles,
  Target,
  UserRound,
  XCircle,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Question = {
  id: number;
  label: string;
  answer: string;
  focus?: boolean;
};

const questions: Question[] = [
  { id: 1, label: "6 × 7", answer: "42" },
  { id: 2, label: "8 × 9", answer: "72", focus: true },
  { id: 3, label: "12 × 5", answer: "60" },
  { id: 4, label: "7 × 8", answer: "56", focus: true },
  { id: 5, label: "9 × 6", answer: "54" },
];

const initialAnswers: Record<number, string> = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
};

export default function Home() {
  const [topic, setTopic] = useState(
    "Matematika za 2. razred osnovne škole, tablica množenja do 100",
  );
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>(initialAnswers);
  const [checked, setChecked] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const score = useMemo(() => {
    const correct = questions.filter(
      (question) => answers[question.id]?.trim() === question.answer,
    ).length;

    return {
      correct,
      total: questions.length,
      percent: Math.round((correct / questions.length) * 100),
    };
  }, [answers]);

  function handleGenerate() {
    setStarted(true);
    setChecked(false);
    setAnswers(initialAnswers);
    window.requestAnimationFrame(() => {
      document.getElementById("provera")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function handleCheckAnswers() {
    setChecked(true);
  }

  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSent(true);
  }

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Demo navigacija">
        <div className="brand">
          <div className="brandMark">
            <BookOpenCheck size={30} />
          </div>
          <div>
            <span>SAP</span>
            <strong>School Assistant</strong>
          </div>
        </div>

        <span className="demoBadge">Demo verzija</span>

        <nav className="sideNav">
          <a href="#unos" className="active">
            <PencilLine size={20} />
            Početna
          </a>
          <a href="#provera">
            <ClipboardList size={20} />
            Provera znanja
          </a>
          <a href="#preporuka">
            <CalendarDays size={20} />
            Plan učenja
          </a>
          <a href="#kontakt">
            <Mail size={20} />
            Kontakt
          </a>
        </nav>

        <div className="parentCard">
          <div className="avatar">
            <UserRound size={18} />
          </div>
          <div>
            <strong>Roditelj demo</strong>
            <span>Bez prijave i naloga</span>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topBar">
          <div>
            <p className="eyebrow">Demo prototip za validaciju ideje</p>
            <h1>SAP - School Assistant for Parents</h1>
            <p>
              Pomaže roditeljima da brzo procene znanje deteta, prate napredak i
              dobiju preporuke za bolje rezultate u školi.
            </p>
          </div>
          <div className="statusPill">
            <Sparkles size={22} />
            <div>
              <strong>Demo verzija</strong>
              <span>Svi podaci su testni</span>
            </div>
          </div>
        </header>

        <section className="heroPanel" id="unos">
          <div className="inputBlock">
            <div className="sectionIcon">
              <PencilLine size={24} />
            </div>
            <div className="inputCopy">
              <h2>Šta vaše dete trenutno uči ili gde ima problem?</h2>
              <p>Napišite temu, razred ili konkretnu oblast koju želite da proverite.</p>
            </div>

            <label className="topicLabel" htmlFor="topic">
              Opišite šta vaše dete trenutno uči ili gde ima problem.
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Matematika za 2. razred osnovne škole, tablica množenja do 100"
            />
            <p className="hint">
              Primer: Matematika za 2. razred osnovne škole, tablica množenja do 100
            </p>

            <button className="primaryButton" type="button" onClick={handleGenerate}>
              <Sparkles size={20} />
              Generiši proveru znanja
            </button>
          </div>

          <div className="studentArt" aria-hidden="true">
            <div className="bubble b1">2 x 4 = 8</div>
            <div className="bubble b2">6 x 7 = ?</div>
            <div className="bubble b3">9 x 3 = 27</div>
            <div className="kidFace">
              <span className="hair" />
              <span className="eye left" />
              <span className="eye right" />
              <span className="smile" />
            </div>
            <div className="desk">
              <span />
            </div>
          </div>
        </section>

        {started && (
          <>
            <section className="assessmentPanel" id="provera">
              <div className="questions">
                <div className="sectionHeading">
                  <div className="sectionIcon small">
                    <ClipboardList size={21} />
                  </div>
                  <div>
                    <h2>Demo provera znanja</h2>
                    <p>5 pitanja iz tablice množenja. Unesite odgovore, pa proverite rezultat.</p>
                  </div>
                </div>

                <div className="questionList">
                  {questions.map((question) => {
                    const isCorrect = answers[question.id]?.trim() === question.answer;

                    return (
                      <label
                        className={`questionRow ${
                          checked ? (isCorrect ? "isCorrect" : "isWrong") : ""
                        }`}
                        key={question.id}
                      >
                        <span>{question.id}.</span>
                        <strong>{question.label} =</strong>
                        <input
                          inputMode="numeric"
                          value={answers[question.id] ?? ""}
                          onChange={(event) => {
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: event.target.value,
                            }));
                            setChecked(false);
                          }}
                          aria-label={`Odgovor za ${question.label}`}
                        />
                        {checked && isCorrect ? (
                          <CheckCircle2 className="correct" size={21} />
                        ) : checked ? (
                          <XCircle className="wrong" size={21} />
                        ) : (
                          <span aria-hidden="true" />
                        )}
                        {checked && !isCorrect && <small>Tačno: {question.answer}</small>}
                      </label>
                    );
                  })}
                </div>

                <button className="checkButton" type="button" onClick={handleCheckAnswers}>
                  Proveri odgovore
                </button>
              </div>

              <aside className="resultCard">
                <div className="sectionHeading compact">
                  <BarChart3 size={24} />
                  <h2>Rezultat</h2>
                </div>
                {checked ? (
                  <>
                    <div
                      className="scoreRing"
                      style={{
                        background: `conic-gradient(#24b15b ${
                          score.percent * 3.6
                        }deg, #e7edf4 0deg)`,
                      }}
                    >
                      <div>
                        <strong>{score.percent}%</strong>
                        <span>Uspešnost</span>
                      </div>
                    </div>
                    <p className="scoreText">
                      <strong>
                        {score.correct} od {score.total} tačnih odgovora
                      </strong>
                      <span>
                        Dete dobro razume tablicu množenja. Potrebno je dodatno vežbati
                        kombinacije sa 7 i 8.
                      </span>
                    </p>
                  </>
                ) : (
                  <div className="resultPlaceholder">
                    <strong>Rezultat će biti prikazan nakon provere.</strong>
                    <span>Unesite odgovore i kliknite na dugme "Proveri odgovore".</span>
                  </div>
                )}
              </aside>
            </section>

            <section className="recommendation" id="preporuka">
              <div className="sectionHeading">
                <Lightbulb size={25} />
                <h2>Preporuka i plan učenja</h2>
              </div>

              <div className="recommendationGrid">
                <article className="recommendationCard focus">
                  <Target size={25} />
                  <h3>Oblast za fokus</h3>
                  <strong>Množenje sa 7 i 8</strong>
                  <p>
                    Posebno obratiti pažnju na kombinacije kao što su 7 x 8,
                    8 x 7, 7 x 9 i 8 x 9.
                  </p>
                </article>

                <article className="recommendationCard plan">
                  <CalendarDays size={25} />
                  <h3>Predlog plana rada</h3>
                  <ul>
                    <li>15 minuta dnevno</li>
                    <li>Narednih 5 dana</li>
                    <li>Kratke vežbe i ponavljanje</li>
                    <li>Provera napretka na kraju plana</li>
                  </ul>
                </article>

                <article className="recommendationCard tasks">
                  <PencilLine size={25} />
                  <h3>Dodatni zadaci</h3>
                  <ul>
                    <li>10 zadataka za vežbu</li>
                    <li>Mešoviti primeri</li>
                    <li>Nivo: lako ka srednjem</li>
                  </ul>
                  <button type="button">
                    Prikaži zadatke
                    <ArrowRight size={18} />
                  </button>
                </article>
              </div>
            </section>
          </>
        )}

        <section className="contactPanel" id="kontakt">
          <div>
            <p className="eyebrow">Puna verzija</p>
            <h2>Želite pristup punoj verziji?</h2>
            <p>
              Ostavite kontakt i dobićete obaveštenje kada personalizovani planovi
              budu dostupni.
            </p>
          </div>

          <form onSubmit={handleContact}>
            <input aria-label="Ime" name="name" placeholder="Ime" required />
            <input aria-label="Email" name="email" placeholder="Email" type="email" required />
            <button className="primaryButton" type="submit">
              Obavesti me
            </button>
            {contactSent && (
              <p className="successMessage" role="status">
                Hvala! Uspešno ste se prijavili za obaveštenje.
              </p>
            )}
          </form>
        </section>
      </section>
    </main>
  );
}
