// Split the text into individual characters
const loopingText = document.querySelector("#loopingText");
const chars = loopingText.textContent.split("");

// Clear the text content and append each character as a span
loopingText.textContent = "";
chars.forEach((char, index) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.display = "inline-block";
  span.dataset.index = index;
  loopingText.appendChild(span);
});

function getRandomColorVariation(baseRGB, variation = 20) {
  // Deconstruct base RGB values
  let [r, g, b] = baseRGB;

  // Generate random variations
  let rVariation = Math.floor(Math.random() * (variation * 2)) - variation;
  let gVariation = Math.floor(Math.random() * (variation * 2)) - variation;
  let bVariation = Math.floor(Math.random() * (variation * 2)) - variation;

  // Apply variations to base color
  r = Math.min(255, Math.max(0, r + rVariation));
  g = Math.min(255, Math.max(0, g + gVariation));
  b = Math.min(255, Math.max(0, b + bVariation));

  return `rgb(${r}, ${g}, ${b})`;
}

// Animate using GSAP
chars.forEach((char, index) => {
  // Generate random x position (landing point) for each character
  const randomX = (Math.random() - 0.5) * 60; // Values between -30 and 30

  // Calculate the end y position so it doesn't exceed window height
  const maxY = window.innerHeight - loopingText.clientHeight;

  // Generate random rotation for each character
  const randomRotationStart = (Math.random() - 0.5) * 120; // Between -60 and 60
  const randomRotationEnd = (Math.random() - 0.5) * 180; // Between -90 and 90
  let randomColor = getRandomColorVariation([44, 62, 80], 20);

  const tl = gsap.timeline({
    delay: 1 + index * 0.5
  });

  // Start the fall: character stretches as it accelerates downward
  tl.to(loopingText.children[index], {
    scaleY: 1.5,
    scaleX: 0.8,
    color: randomColor,
    y: Math.min(300, maxY),
    x: randomX,
    rotation: randomRotationStart,
    duration: 0.8,
    ease: "power2.in"
  })

    // Character hits the ground: squashes on impact
    .to(loopingText.children[index], {
      scaleY: 0.5,
      scaleX: 1.2,
      y: "700px",
      x: randomX,
      rotation: randomRotationEnd,
      duration: 0.2
    })

    // Bounce back to the original state
    .to(loopingText.children[index], {
      scaleY: 1,
      scaleX: 1,
      y: "700px",
      x: randomX,
      rotation: randomRotationEnd,
      duration: 0.5,
      ease: "bounce.out"
    });
});
