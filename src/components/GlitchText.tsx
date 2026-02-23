import { createSignal, onMount } from "solid-js";

const TITLE = "a generalist";
const JUNK = [
  "#",
  "@",
  "%",
  "*",
  "&",
  "<",
  ">",
  "_",
  "=",
  "+",
  "[",
  "]",
  "|",
  "-",
  "!",
  "?",
  "x",
];

function runGlitchAnimation(
  setText: (fn: (prev: string) => string) => void,
  speed: number = 1,
): Promise<void> {
  return new Promise((resolve) => {
    const junkDuration = 5 * speed;
    const titleDuration = 6 * speed;

    for (let i = 0; i < TITLE.length; i++) {
      for (let j = 0; j < JUNK.length; j++) {
        setTimeout(
          () => {
            setText((prev) => {
              const chars = prev.split("");
              chars[i] = JUNK[j];
              return chars.join("");
            });
          },
          junkDuration * (i * JUNK.length + j),
        );
      }

      setTimeout(
        () => {
          setText((prev) => {
            const chars = prev.split("");
            chars[i] = TITLE[i];
            return chars.join("");
          });
        },
        titleDuration * (i * JUNK.length + JUNK.length),
      );
    }

    const totalTime = titleDuration * (TITLE.length * JUNK.length);
    setTimeout(() => resolve(), totalTime);
  });
}

export default function GlitchText() {
  const [glitchText, setGlitchText] = createSignal("????????????");

  onMount(() => {
    setTimeout(async () => {
      await runGlitchAnimation(setGlitchText, 0.6);
    }, 250);
  });

  const handleHover = () => {
    runGlitchAnimation(setGlitchText, 0.4);
  };

  return (
    <div
      onMouseOver={handleHover}
      onClick={handleHover}
      id="glitch-text"
      class="lg:hover:text-(--accent) font-display tracking-wide text-4xl md:text-6xl lg:hover:cursor-help duration-300 select-none"
    >
      {glitchText()}
    </div>
  );
}
