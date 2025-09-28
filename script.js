const wordInput = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");

searchBtn.addEventListener("click", async () => {
  const word = wordInput.value.trim();
  if (!word) {
    result.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  result.innerHTML = "<p>Searching...</p>";

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    const entry = data[0];

    const meanings = entry.meanings
      .map(
        (m) =>
          `<h3>${m.partOfSpeech}</h3><ul>` +
          m.definitions.map((d) => `<li>${d.definition}</li>`).join("") +
          "</ul>"
      )
      .join("");

    result.innerHTML = `
      <h2>${entry.word}</h2>
      ${meanings}
    `;
  } catch (error) {
    result.innerHTML = `<p>${error.message}</p>`;
  }
});
