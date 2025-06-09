document.addEventListener("DOMContentLoaded", () => {
  // Media files for each section (videos and images)
  const screenMedia = [
    "videos/bajacalidad1.mp4", // Video for section 1
    "images/chat1.webp", // Image for section 2
    "images/date1.webp", // Image for section 3
    "images/collage4.webp", // Image for section 4
  ]

  // Phone rotation angles for each section
  const phoneRotations = [
    "rotateY(0deg) rotateX(0deg)", // Rotation for section 1
    "rotateY(25deg) rotateX(5deg)", // Rotation for section 2
    "rotateY(-25deg) rotateX(20deg)", // Rotation for section 3
    "rotateY(26deg) rotateX(10deg)", // Rotation for section 4
  ]

  // Get DOM elements
  const phoneScreen = document.querySelector(".phone-screen")
  const phone = document.querySelector(".phone")
  const sections = document.querySelectorAll(".section")

  // Clear existing content
  phoneScreen.innerHTML = ""

  // Create two media containers for smooth transitions
  const container1 = document.createElement("div")
  const container2 = document.createElement("div")

  // Style both containers
  const containerStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden"
  }

  Object.assign(container1.style, containerStyle)
  Object.assign(container2.style, containerStyle)
  container1.style.zIndex = "2"
  container2.style.zIndex = "1"

  // Add containers to phone screen
  phoneScreen.appendChild(container1)
  phoneScreen.appendChild(container2)

  // Variables to track current state
  let activeContainer = 1
  let currentSectionIndex = 0
  let lastSectionIndex = 0

  // Function to determine if a file is a video
  function isVideo(src) {
    return src.toLowerCase().includes('.mp4') || 
           src.toLowerCase().includes('.webm') || 
           src.toLowerCase().includes('.ogg')
  }

  // Function to create media element (video or image)
  function createMediaElement(src) {
    if (isVideo(src)) {
      const video = document.createElement("video")
      video.src = src
      video.autoplay = true
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.style.width = "100%"
      video.style.height = "100%"
      video.style.objectFit = "cover"
      return video
    } else {
      const img = document.createElement("img")
      img.src = src
      img.alt = "Phone Screen Content"
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "cover"
      return img
    }
  }

  // Function to load media into container
  function loadMediaIntoContainer(container, src) {
    // Clear container
    container.innerHTML = ""
    
    // Create and add media element
    const mediaElement = createMediaElement(src)
    container.appendChild(mediaElement)
    
    // If it's a video, ensure it plays
    if (isVideo(src)) {
      mediaElement.addEventListener('loadeddata', () => {
        mediaElement.play().catch(e => {
          console.log("Video autoplay prevented:", e)
        })
      })
    }
  }

  // Preload media function
  function preloadMedia() {
    screenMedia.forEach((src) => {
      if (isVideo(src)) {
        const video = document.createElement("video")
        video.src = src
        video.preload = "metadata"
      } else {
        const img = new Image()
        img.src = src
      }
    })
  }

  // Initialize with first media
  loadMediaIntoContainer(container1, screenMedia[0])
  preloadMedia()

  // Function to update phone content and rotation
  function updatePhone() {
    // Calculate scroll position (middle of viewport)
    const scrollPosition = window.scrollY + window.innerHeight / 2

    // Find current visible section
    lastSectionIndex = currentSectionIndex
    currentSectionIndex = 0
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = index
      }
    })

    // Only update if section changed
    if (currentSectionIndex !== lastSectionIndex) {
      // Determine active and inactive containers
      const activeContainerEl = activeContainer === 1 ? container1 : container2
      const inactiveContainerEl = activeContainer === 1 ? container2 : container1

      // Prepare inactive container with new content
      loadMediaIntoContainer(inactiveContainerEl, screenMedia[currentSectionIndex])
      inactiveContainerEl.style.opacity = "0"
      inactiveContainerEl.style.transition = "none"

      // Force reflow
      void inactiveContainerEl.offsetWidth

      // Bring inactive container to front
      inactiveContainerEl.style.zIndex = "3"
      activeContainerEl.style.zIndex = "2"

      // Fade in new content
      inactiveContainerEl.style.transition = "opacity 0.5s ease"
      inactiveContainerEl.style.opacity = "1"

      // Switch active container
      activeContainer = activeContainer === 1 ? 2 : 1
    }

    // Update phone rotation
    phone.style.transform = phoneRotations[currentSectionIndex]
  }

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    updatePhone()
  })

  // Initialize
  updatePhone()
})

// Phone visibility logic
const elementoFlotante = document.getElementById('miphone');
const seccionObjetivo = document.querySelector('.seccion-objetivo');

// Function to check if element is visible
function esVisible(elemento) {
  const rect = elemento.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom >= 0
  );
}

// Function executed on scroll
function alHacerScroll() {
  // Hide element if target section is visible
  if (esVisible(seccionObjetivo)) {
    elementoFlotante.style.display = 'none';
  } else {
    // Show element if target section is not visible
    elementoFlotante.style.display = 'block';
  }
}

// Add scroll event listener
window.addEventListener('scroll', alHacerScroll);

// Check on page load
alHacerScroll();