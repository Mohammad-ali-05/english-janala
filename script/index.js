// Showing and hiding loading icon
const loadingIcon = (value) => {
    if (value) {
        document.getElementById("loading-icon-container").classList.remove("hidden");
        document.getElementById("loading-icon-container").classList.add("flex");
    } else {
        document.getElementById("loading-icon-container").classList.remove("flex");
        document.getElementById("loading-icon-container").classList.add("hidden");
    }
} 

// Loading lessons from API on page load
const loadLessons = async () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((json) => displayLessons(json.data))
}

// Displaying lessons on page
const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessons.forEach((LessonData) => {
        lessonContainer.insertAdjacentHTML(
          "beforeend",
          `<button onclick ="loadWordByLesson(${LessonData.level_no})" class="text-sm font-semibold text-[#422AD5] rounded-md border-2 border-[#422AD5] w-32 h-10 hover:bg-[#422AD5] hover:text-white lesson-buttons" type="button"><i class="fa-solid fa-book-open"></i>&nbsp; &nbsp;Lesson -${LessonData.level_no}</button>
            `
        );
    })
}
loadLessons();

// Changing button color on click and hiding select word container
document.getElementById("lesson-container").addEventListener("click", function (e) {
    const allLessonButton = document.getElementsByClassName("lesson-buttons");
    const allLessonButtonArray = Array.from(allLessonButton)
    if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
        allLessonButtonArray.forEach((button) => {
            button.classList.add("bg-white", "text-[#422AD5]");
            button.classList.remove("bg-[#422AD5]", "text-white");
            if (e.target.tagName === "I") {
                e.target.parentNode.classList.add("bg-[#422AD5]", "text-white");
                e.target.parentNode.classList.remove("bg-white", "text-[#422AD5]");
            } else {
                e.target.classList.add("bg-[#422AD5]", "text-white");
                e.target.classList.remove("bg-white", "text-[#422AD5]");
            }
        })
    }
});

// loading search word from API
const loadingSearchWord = () => {
    fetch("https://openapi.programming-hero.com/api/words/all")
      .then((response) => response.json())
      .then((json) => displayingSearchWord(json.data));
}

// Displaying search word
const displayingSearchWord = (allWords) => {
    const searchValue = document.getElementById("search-value").value.toLowerCase().trim();
    const filteredWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    filteredWords.forEach((wordData) => {
        wordContainer.classList.add("grid");
        wordContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="rounded-xl bg-white p-3 lg:p-14">
                    <div class="flex flex-col justify-center items-center mb-14">
                        <p class="text-3xl font-bold">${
                          !!wordData.word ? wordData.word : "শব্দ পাওয়া যায়নি"
                        }</p>
                        <p class="text-xl font-medium my-6">Meaning / Pronounciation</p>
                        <p class="text-3xl font-semibold text-[#18181B]">${
                          !!wordData.meaning
                            ? wordData.meaning
                            : "অর্থ পাওয়া যায়নি"
                        } / ${
            !!wordData.pronunciation
              ? wordData.pronunciation
              : "উচ্চারণ পাওয়া যায়নি"
          }</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <button onclick ="loadWordDetails(${
                          wordData.id
                        })" class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick ="pronounceWord('${wordData.word}')" class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
                `
        );          
    })
}

// Loading words by lesson from API
const loadWordByLesson = (id) => {
    loadingIcon(true);
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((response) => response.json())
        .then((json) => displayWordsByLesson(json.data))
}

// Displaying words by lesson
const displayWordsByLesson = (wordData) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""
    if (wordData.length) {
        wordContainer.classList.add("grid")
        wordData.forEach((wordData) => {
            wordContainer.insertAdjacentHTML(
              "beforeend",
              `<div class="rounded-xl bg-white p-3 lg:p-14">
                    <div class="flex flex-col justify-center items-center mb-14">
                        <p class="text-3xl font-bold">${
                          !!wordData.word ? wordData.word : "শব্দ পাওয়া যায়নি"
                        }</p>
                        <p class="text-xl font-medium my-6">Meaning / Pronounciation</p>
                        <p class="text-3xl font-semibold text-[#18181B]">${
                          !!wordData.meaning
                            ? wordData.meaning
                            : "অর্থ পাওয়া যায়নি"
                        } / ${
                !!wordData.pronunciation
                  ? wordData.pronunciation
                  : "উচ্চারণ পাওয়া যায়নি"
              }</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <button onclick ="loadWordDetails(${
                          wordData.id
                        })" class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-circle-info"></i></button>
                        <button onclick ="pronounceWord('${wordData.word}')" class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
                `
            );
        })
        loadingIcon(false);
    } else {
        wordContainer.classList.remove("grid");
        wordContainer.insertAdjacentHTML(
          "beforeend",
          `<div class="my-20">
                <img class="w-24 mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-sm text-[#79716b] text-center mb-4 hind-siliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-4xl font-medium text-[#292524] text-center hind-siliguri">নেক্সট Lesson এ যান</p>
            </div>
            `
        );
        loadingIcon(false);
    }
}
// Word pronunciation by clicking button
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// load word details by clocking on button
const loadWordDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then((response) => response.json())
        .then((json) => displayWordDetails(json.data))
}

// Display word details by clocking on button
const displayWordDetails = (wordDetails) => {
    const wordDetailsContainer = document.getElementById('word-details-container')
    wordDetailsContainer.innerHTML = ""
    wordDetailsContainer.insertAdjacentHTML(
      "beforeend",
      `<h3 class="text-4xl font-semibold  mb-8">${
        !!wordDetails.word ? wordDetails.word : "শব্দ পাওয়া যায়নি"
      } (<i class="fa-solid fa-microphone-lines"></i>:${
        !!wordDetails.pronunciation
          ? wordDetails.pronunciation
          : "উচ্চারণ পাওয়া যায়নি"
      })</h3>
        <div class="mb-8">
            <h4 class="text-2xl font-semibold py-1 mb-2">Meaning</h4>
            <p class="text-2xl font-medium py-1 hind-siliguri">${
              !!wordDetails.meaning ? wordDetails.meaning : "অর্থ পাওয়া যায়নি"
            }</p>
        </div>
        <div class="mb-8">
            <h4 class="text-2xl font-semibold py-1 mb-2">Example</h4>
            <p class="text-2xl text-opacity-80 py-1">${
              !!wordDetails.sentence
                ? wordDetails.sentence
                : "বাক্য পাওয়া যায়নি"
            }</p>
        </div>
        <div>
            <h4 class="text-2xl font-semibold mb-2 py-1 hind-siliguri">সমার্থক শব্দ গুলো</h4>
            <div id="synonyms-container" class="flex flex-wrap gap-5 text-xl text-opacity-80 py-1">${
              wordDetails.synonyms.length
                ? synonymsInsertedElementsArray(wordDetails.synonyms)
                : "সমার্থক শব্দ পাওয়া যায়নি"
            }</div>
        </div>
        `
    );
    document.getElementById("my_modal_1").showModal();
} 

// Function for inserting synonyms into modal
function synonymsInsertedElementsArray(synonymsArray) {
    const synonymsHtmlArray = synonymsArray.map((synonym) => {
        return `<p class="text-xl text-opacity-80 flex justify-center items-center bg-[#EDF7FF] border-2 border-[#D7E4EF] rounded-md w-40 h-14">${synonym}</p>
        `;
    })
    return synonymsHtmlArray.join(" ")
}
