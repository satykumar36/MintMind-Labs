// ==========Scroll Process==========

// gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".scroll_process").forEach(process => {
  const container = process.querySelector(".scroll_process-inner");
  const sections = gsap.utils.toArray(container.querySelectorAll("section"));
  const mask = process.querySelector(".mask");

  // Horizontal scroll animation
  const scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: process,
      pin: true,
      scrub: 0.3,
      end: () => "+=" + (container.scrollWidth * 0.8)

    }
  });

  // Animate the mask width based on scroll progress
  ScrollTrigger.create({
    trigger: process,
    start: "top top",
    end: () => "+=" + (container.scrollWidth * 0.8),
    scrub: 0.3,
    onUpdate: self => {
      const progress = self.progress;
      mask.style.width = `${progress * 100}%`;
    }
  });

  // Animate elements inside each section
  sections.forEach(section => {
    const animEls = section.querySelectorAll(".anim");
    if (animEls.length === 0) return;

    // Skip animation for the first section
  // if (index === 0) {
  //   gsap.set(animEls, {
  //     opacity: 1,
  //     y: 0
  //   });
  //   return;
  // }

    gsap.from(animEls, {
      y: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        containerAnimation: scrollTween,
        start: "left center",
      }
    });
  });
});

// ================Home Page Scroll Section===============

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.feature-slider');
  const track = document.querySelector('.feature-track');
  const prevBtn = document.getElementById('prevFeatureBtn');
  const nextBtn = document.getElementById('nextFeatureBtn');

  let currentIndex = 0;
  const cardWidth = 350; // Adjust if your actual card + margin is different

  // Button navigation
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    const maxIndex = track.children.length - 1;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = 0;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  });

  // Mouse drag scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('grabbing');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('grabbing');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('grabbing');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });

  // Mobile touch scroll
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].clientX;
    const delta = touchStartX - touchX;
    slider.scrollLeft += delta;
    touchStartX = touchX;
  });
});

// ===============================

document.addEventListener("DOMContentLoaded", () => {
  initParticles("particle-js-2");
  initParticles("particle-js-6");
});


// ===============Jobs Section================

const jobsUrl = "./data/jobData.json";

fetch(jobsUrl)
  .then((response) => response.json())
  .then((data) => {
    const jobContainer = document.getElementById("job-container");

    // Iterate over each job and create HTML elements
    data.jobs.forEach((job) => {
      const jobTile = document.createElement("div");
      jobTile.classList.add("col-12", "col-lg-4", "mt-4");

      jobTile.innerHTML = `
                <div class="project-card">
                    <div class="job-tile-top-header">
                        <div class="job-nature-holder">
                            <div class="job-nature">
                                <p>${job.nature}</p>
                            </div>
                        </div>
                        <div class="job-salary-holder"></div>
                    </div>
                    <div class="job-tile-content">
                        <div class="job-name">
                            <h1>${job.title}</h1>
                            <p>Mintmind Labs</p>
                            <p>${job.description}</p>
                        </div>
                    </div>
                    <div class="job-view-content">
                        <a href="#">View Job</a>
                    </div>
                </div>
            `;

      // Append the job tile to the container
      jobContainer.appendChild(jobTile);
    });
  })
  .catch((error) => console.error("Error fetching jobs:", error));

function navigateToContact(link) {
  window.location.href = link;
}

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const clone = slider.innerHTML;
  slider.innerHTML += clone;
});

document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particle-js", {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        // "value": "#7380f4" fde30c
        value: "#7380f4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#7380f4",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

function initParticles(id) {
  particlesJS(id, {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#7380f4",
      },
      shape: {
        type: "triangle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: 3,
        random: true,
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });
}


document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particle-js-3", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#7380f4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true, // Disable the connecting lines
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particle-js-4", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#7380f4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true, // Disable the connecting lines
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particle-js-5", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        // "value": "#7380f4" fde30c
        value: "#7380f4",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#7380f4",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

(function () {
  emailjs.init("pEEOSLXPM24Ko5syi");
})();


document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    // Function to validate input fields
    function validateField(field, errorField) {
      if (field.value.trim() === "") {
        field.classList.add("input-error");
        errorField.style.display = "block";
        isValid = false;
      } else {
        field.classList.remove("input-error");
        errorField.style.display = "none";
      }
    }

    // Function to validate checkboxes
    function validateCheckboxes() {
      const checkboxes = document.querySelectorAll(".form-check-input");
      const errorField = document.getElementById("serviceTypeError");
      const isChecked = Array.from(checkboxes).some(
        (checkbox) => checkbox.checked
      );

      if (!isChecked) {
        errorField.style.display = "block";
        isValid = false;
      } else {
        errorField.style.display = "none";
      }
    }

    // Validate each field
    validateField(
      document.getElementById("name"),
      document.getElementById("nameError")
    );
    validateField(
      document.getElementById("email"),
      document.getElementById("emailError")
    );
    validateField(
      document.getElementById("phone-number"),
      document.getElementById("phoneError")
    );
    validateField(
      document.getElementById("service-description"),
      document.getElementById("descriptionError")
    );

    // Validate checkboxes
    validateCheckboxes();

    // Get form field values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const serviceDescription = document
      .getElementById("service-description")
      .value.trim();

    // Get checked service types
    const serviceTypes = [];
    document
      .querySelectorAll('input[name="serviceType"]:checked')
      .forEach((checkbox) => {
        serviceTypes.push(checkbox.value);
      });

    // Validate required fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      serviceTypes.length === 0 ||
      !serviceDescription
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send data via EmailJS
    emailjs
      .send("service_yhrbfsw", "template_2gegjl8", {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        serviceType: serviceTypes.join(", "), // Convert array to string
        serviceDescription: serviceDescription,
      })
      .then(
        function (response) {
          alert("Message sent successfully! We'll get back to you soon.");
          document.getElementById("contactForm").reset(); // Reset form
        },
        function (error) {
          alert("Failed to send message. Please try again later.");
          console.error(error);
        }
      );
  });


