//variables
const courses = document.querySelector('#courses-list');



//listeners

loadEventListeners();

function loadEventListeners() {
    //when a new course is added
    courses.addEventListener('click', buyCourse);
}





//functions
function buyCourse(e) {
    e.preventDefault();
    //use delegation to find the course that was added
    if(e.target.classList.contains('add-to-cart')) {
        //read the course values
        const course = e.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}
//reads the HTML information of the selected course
function getCourseInfo(course) {
    console.log(course);
}