/**
 * Questions API:
 * bogs.nierva@gmail.com
 * Mischa.102318!
 * https://quizapi.io/clientarea
 * dB8UEVlfhUW4vFKw5jtPdtBPmkA6uwurUKca1VAA
 */

const menuToggle = document.querySelector(".menu__toggle");
const nav = document.querySelector(".nav");
const profilesMainContainer = document.querySelector(".profiles-container")

menuToggle.addEventListener("click", () => {
	menuToggle.classList.toggle("menu__toggle--active");
	nav.classList.toggle("nav--open");
});

/** Fetch Sample Profiles */
const profilesApiUrl = "https://randomuser.me/api/?results=11";

async function fetchProfiles() {
  try {
    const response = await fetch(profilesApiUrl);
    const data = await response.json();
    displayProfiles(data.results);
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
}

function displayProfiles(profiles) {
  const profilesContainer = document.getElementById("profiles");
  profilesContainer.innerHTML = "";

  profiles.forEach((profile, index) => {
    const profileElement = document.createElement("li");
    profileElement.classList.add("profile-list__item");

    profileElement.innerHTML = `
      <figure class="card">
        <a href="#"><img src="${profile.picture.large}" alt="Profile Image" class="card__img" /></a>
        <figcaption class="card__content">
          <div class="card__content-header">
            <h2 class="card__content-name">${profile.name.first} ${profile.name.last}</h2>
            <p>${profile.email}</p>
          </div>
          <div class="card__content-info">
            <div>
              <p class="text-sm">Location</p>
              <p class="text-lg">${profile.location.city}, ${profile.location.country}</p>
            </div>
            <img src="img/icon-arrow-right-color.svg" class="card__content-icon" alt="Icon" />
          </div>
        </figcaption>
      </figure>
    `;

    profileElement.addEventListener("click", function () {
      const modal = document.getElementById("profileModal");
      const modalContent = document.getElementById("modalProfileContent");
      modalContent.innerHTML = `
        <div class="modal__inner">
          <div class="modal__inner-img">
            <img src="${profile.picture.large}" alt="Profile Image" />
          </div>
          <div class="modal__inner-content">
            <h1>${profile.name.first} ${profile.name.last}</h1>
            <ul class="profile-info">
              <li><strong>Email:</strong> ${profile.email}</li>
              <li><strong>Location:</strong> ${profile.location.city}, ${profile.location.country}</li>
              <li><strong>Phone:</strong> ${profile.phone}</li>
              <li><strong>Date of Birth:</strong> ${profile.dob.date}</li>
              <li><strong>Nationality:</strong> ${profile.nat}</li>
              <li><strong>Gender:</strong> ${profile.gender}</li>
              <li><strong>ID:</strong> ${profile.id.value}</li>
            </ul>
            <button id="startTestButton" class="btn btn--primary">Start Test</button>
          </div>
        </div>
      `;
      modal.style.display = "block";

      const startTestButton = document.querySelector("#startTestButton");
      startTestButton.addEventListener("click", function () {
        // console.log("Start Test button clicked!");
        modal.style.display = "none";
        fetchQuestions();
        profilesMainContainer.style.display = "none";
      })
    });

    profilesContainer.appendChild(profileElement);
  });

  // Get the modal
  const modal = document.getElementById("profileModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

fetchProfiles();

/** Fetch Questions */
const apiKey = "dB8UEVlfhUW4vFKw5jtPdtBPmkA6uwurUKca1VAA";
const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10`;

async function fetchQuestions() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
    console.log("data:", data);
		displayQuestions(data);
	} catch (error) {
		console.error("Error fetching questions:", error);
	}
}

function displayQuestions(questions) {
	const questionsContainer = document.getElementById("questions-container");
	questionsContainer.innerHTML = "";

	questions.forEach((question, index) => {
		const questionElement = document.createElement("div");
		questionElement.classList.add("question");

    const correctAnswer = question.correct_answer ? question.correct_answer : "No correct answer provided";

		questionElement.innerHTML = `
        <h2>Question ${index + 1}</h2>
        <p>${question.question}</p>
        <ul>
          ${Object.entries(question.answers)
				.map(([key, answer]) => (answer ? `<li>${answer}</li>` : ""))
				.join("")}
        </ul>
      `;

		questionsContainer.appendChild(questionElement);
    questionsContainer.style.display = "block";
	});
}