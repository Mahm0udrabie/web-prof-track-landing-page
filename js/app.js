/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

/*select all navbar list links */
const navEl = document.querySelector('#navbar__list');
/*select all sections */
const sections = document.querySelectorAll('section');
// select back to top button 
let mybutton = document.getElementById("myBtn");
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// get section viewport
const sectionPosition = section => {
    return section.getBoundingClientRect();
}

// check if section inn viewport
const checkPosition = section => {
    const checking = sectionPosition(section);
    return checking.top < 50 && checking.bottom > 50;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
const buildNav = () => {
    //createDocumentFragment helps to extract your document to parst when you want 
    //to update or insert to be easy to work with specfic part not all document its the best the for performance
    const ulTemp = document.createDocumentFragment();
    //define needs variables
    let text, newEl, link;
    sections.forEach(section => {
        // get section text name from data-nav 
        text = section.getAttribute('data-nav');
        // create a tag  
        link = document.createElement('a');
        // create link id  
        link.id = `#${section.id}`;
        // add text  content from data-nav to link 
        link.textContent = text;
        // add menu__link class to a tag to style it
        link.className = "menu__link";
        // link as pointer 
        link.style.cursor = 'pointer';
        // create li element
        newEl = document.createElement('li');
        // add (a) tag to li tag  
        newEl.appendChild(link);
        ulTemp.appendChild(newEl);
    });
    // append fragmant document into nav element
    navEl.appendChild(ulTemp);
    // add style attribute left to nav 
    navEl.style.float = "left";
}

// Scroll to section on link click using scrollIntoView

const scrollToSection = () => {
    let section;
    document.querySelectorAll('a').forEach(a => {
        a.addEventListener("click", function () {
            // section id to scroll to selected section
            section = a.id;
            document.querySelector(section).scrollIntoView({
                'behavior': 'smooth'
            });
        });
    });
}

// Set sections and selected nav item  active 
// Add class 'active' to section when near top of viewport

const activeSection = () => {
    // loop through sections ato specifying active section and nav item
    sections.forEach(section => {
        //remove active class from section if it exist
        section.classList.remove('your-active-class');
        //remove active class from nav item if it exist
        document.getElementById(`#${section.id}`).classList.remove('active__link');
        // check if section in position  (view port) to add active class and same for nav item  
        if (checkPosition(section)) {
            section.classList.add('your-active-class');
            document.getElementById(`#${section.id}`).classList.add('active__link');
        }
    });
}
// back to top button
// hide or show back to top button based on scrolling in document
const scrollFunction = () => {
    mybutton.style.display = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? "block" : "none";
}

// When the user clicks on the button, scroll to the top of the document
const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNav();
// go the specific section when scroll
scrollToSection();
// check active sections when scrool 
window.addEventListener('scroll', activeSection);
// page scroll back to zero
window.onscroll = () => {
    scrollFunction()
};
