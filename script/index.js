const loadLessons = async () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((json) => displayLessons(json.data))
}

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessons.forEach((LessonData) => {
        lessonContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="text-sm font-semibold text-[#422AD5] rounded-md border-2 border-[#422AD5] w-32 h-10 hover:bg-[#422AD5] hover:text-white" type="button"><i class="fa-solid fa-book-open"></i>&nbsp; &nbsp;Lesson -${LessonData.level_no}</button>
            `
        );
        console.log(LessonData.level_no);
    })
}
loadLessons();