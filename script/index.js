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
    const selectWordContainer = document.getElementById(
      "select-word-container"
    );
    if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
        selectWordContainer.classList.remove("flex");
        selectWordContainer.classList.add("hidden");
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

// Loading words by lesson from API
const loadWordByLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((response) => response.json())
        .then((json) => displayWordsByLesson(json.data))
}

// Displaying words by lesson
const displayWordsByLesson = (wordData) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.classList.remove("hidden")
    wordContainer.classList.add("grid")
    wordContainer.innerHTML = ""
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
                    <button class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="text-[#374957] bg-[#1a91ff1a] rounded-lg w-14 h-14"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
            `
        );
    })
}