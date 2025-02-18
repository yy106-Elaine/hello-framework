import plays from "./plays.js"; // Import plays data

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 JavaScript is running!");

  const playList = document.getElementById("play-list");
  if (!playList) {
    console.error("❌ Could not find #play-list in the document!");
    return;
  }

  try {
    console.log("✅ Loaded Plays:", plays);

    // Clear placeholder text
    playList.innerHTML = "";

    // Insert play data into the list
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
});
