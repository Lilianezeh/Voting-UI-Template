import type { VotingState } from "./types.js";
import { createInitialState, castVote, getVotesCastCount, getWinner } from "./logic.js";

// ================================
// GET HTML ELEMENTS
// ================================
const voteButton = document.getElementById("voteBtn") as HTMLButtonElement;
const voterSelect = document.getElementById("voterSelect") as HTMLSelectElement;
const candidateSelect = document.getElementById("candidateSelect") as HTMLSelectElement;
const votesCastEl = document.getElementById("votesCast") as HTMLSpanElement;
const resultsContainer = document.getElementById("resultsContainer") as HTMLDivElement;
const winnerEl = document.getElementById("winner") as HTMLHeadingElement;
const dialog = document.getElementById("dialog") as HTMLDialogElement;
const confirmVoteBtn = document.getElementById("confirmVoteBtn") as HTMLButtonElement;
const cancelVoteBtn = document.getElementById("cancelVoteBtn") as HTMLButtonElement;

// ================================
// STATE
// ================================
const VOTER_NAMES = [
  "Austin", "Lilian", "Majesty", "Chidimma", "Ifeanyi", "Stephanie", "Rita",
  "Christopher", "Bonaventure", "Victor", "Amarachi", "Charles", "Abigail",
  "Loveth", "James", "David", "Anthony", "Kosisochukwu", "Gabriel", "Peter",
];
const CANDIDATE_NAMES = ["Kosisochukwu", "Austin", "Lilian", "Ifeanyi", "Victor", "Charles"];

let state: VotingState = createInitialState(VOTER_NAMES, CANDIDATE_NAMES);

// ================================
// RENDER
// ================================
function render(): void {
  votesCastEl.textContent = String(getVotesCastCount(state));

  const maxVotes = Math.max(...state.candidates.map((c) => c.votes));
  const leaderExists = maxVotes > 0;

  resultsContainer.innerHTML = "";
  for (const candidate of state.candidates) {
    const row = document.createElement("h3");
    const isLeading = leaderExists && candidate.votes === maxVotes;

    row.textContent = `${candidate.name} : ${candidate.votes}`;
    row.className = isLeading
      ? "font-bold text-yellow-300"
      : "text-white";

    resultsContainer.appendChild(row);
  }

  winnerEl.textContent = getWinner(state);
}

// ================================
// EVENTS
// ================================
voteButton.addEventListener("click", () => {
  const voterName = voterSelect.value;
  const candidateName = candidateSelect.value;

  if (voterName === "Choose a name" || candidateName === "Select Candidate") {
    alert("Please select your name and a candidate first.");
    return;
  }

  dialog.showModal();
});

confirmVoteBtn.addEventListener("click", () => {
  const voterName = voterSelect.value;
  const candidateName = candidateSelect.value;

  const result = castVote(state, voterName, candidateName);

  if (!result.success) {
    alert(result.error);
    dialog.close();
    return;
  }

  state = result.state;
  render();
  dialog.close();

  voterSelect.selectedIndex = 0;
  candidateSelect.selectedIndex = 0;
});

cancelVoteBtn.addEventListener("click", () => {
  dialog.close();
});

// Initial render on page load
render();