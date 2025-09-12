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
          `<button class="text-sm font-semibold text-[#422AD5] rounded-md border-2 border-[#422AD5] w-32 h-10 hover:bg-[#422AD5] hover:text-white lesson-buttons" type="button"><i class="fa-solid fa-book-open"></i>&nbsp; &nbsp;Lesson -${LessonData.level_no}</button>
            `
        );
    })
}
loadLessons();

// Changing button color on clock
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