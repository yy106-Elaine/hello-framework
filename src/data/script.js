import plays from "./data/plays.js";
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 JavaScript is running!");

  // ✅ Render Play List
  const playList = document.getElementById("play-list");
  if (!playList) {
    console.error("❌ Could not find #play-list in the document!");
    return;
  }

  try {
    console.log("✅ Loaded Plays:", plays);

    playList.innerHTML = ""; // Clear placeholder text

    plays.forEach(play => {
      const li = document.createElement("li");
      li.innerText = `${play.title} by ${play.author} (Genre: ${play.genre})`;
      playList.appendChild(li);
    });

    console.log("✅ Play list successfully updated!");
  } catch (error) {
    console.error("❌ Error loading plays:", error);
    playList.innerText = "❌ Failed to load plays.";
  }

  // ✅ Render Chart
  const chartContainer = document.getElementById("chart-container");
  if (!chartContainer) {
    console.error("❌ Chart container not found!");
    return;
  }

  console.log("✅ Rendering chart...");

  function countByGenre(data) {
    const genreCounts = {};
    data.forEach(play => {
      const genre = play.genre || "Unknown";
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
    return Object.entries(genreCounts).map(([genre, count]) => ({ genre, count }));
  }

  function genrePlot(data) {
    return Plot.plot({
      title: "Number of Plays by Genre",
      width: 600,
      height: 400,
      x: { label: "Genre" },
      y: { label: "Count" },
      marks: [
        Plot.barY(countByGenre(data), { x: "genre", y: "count", fill: "steelblue" })
      ]
    });
  }

  try {
    const chart = genrePlot(plays);
    chartContainer.innerHTML = ""; // Clear placeholder
    chartContainer.appendChild(chart);
    console.log("✅ Chart displayed successfully!");
  } catch (error) {
    console.error("❌ Chart rendering error:", error);
  }
});