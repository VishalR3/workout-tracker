// delay function

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const titleCase = (s) => {
  return s
    .trim()
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((letter, index) =>
          !index ? String(letter).toUpperCase() : String(letter).toLowerCase()
        )
        .join("")
    );
};
