import gsap from "gsap";

const STARCIRCLERADIUS = 20;
const ANCHORCIRCLERADIUS = 50;

const STARMARKUP = `<svg
   version="1.1"
   width="11"
   height="11"
   style="clip-rule:evenodd;fill-rule:evenodd;image-rendering:optimizeQuality;shape-rendering:geometricPrecision;text-rendering:geometricPrecision"
   id="svg11"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
   class="star"
  <defs
     id="defs11" />
  <g
     id="g6"
     transform="translate(-184.5,-127.5)">
    <path
       style="opacity:1"
       fill="currentColor"
       d="m 187.5,127.5 c 2.411,1.719 5.077,3.052 8,4 -2.295,1.7 -3.628,4.034 -4,7 -1.659,-2.482 -3.992,-3.982 -7,-4.5 2.419,-1.509 3.419,-3.675 3,-6.5 z"
       id="path6" />
  </g>
</svg>
`;

const ANCHORMARKUP = `<p class="starburst-anchor">
        <svg
          version="1.1"
          width="12.049034"
          height="15.91597"
          style="
            clip-rule: evenodd;
            fill-rule: evenodd;
            image-rendering: optimizeQuality;
            shape-rendering: geometricPrecision;
            text-rendering: geometricPrecision;
          "
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs11" />
          <g id="g9" transform="translate(-173.5,-151.50001)">
            <path
              style="opacity: 1"
              fill="currentColor"
              d="m 180.5,151.5 c 4.476,0.322 5.976,2.656 4.5,7 -1.211,3.259 -3.044,6.092 -5.5,8.5 -3.053,1.072 -5.053,0.072 -6,-3 3.258,-3.687 5.592,-7.854 7,-12.5 z"
              id="path9"
            />
          </g>
        </svg>
      </p>`;

function animate() {
  // cleanup
  let anchors = Array.from(document.getElementsByClassName("starburst-anchor"));
  for (const anchor of anchors) {
    anchor.remove();
  }

  let stars = Array.from(document.getElementsByClassName("star"));
  for (const star of stars) {
    star.remove();
  }

  // prep elems
  insertAnchors();
  anchors = Array.from(document.getElementsByClassName("starburst-anchor"));
  for (const anchor of anchors) {
    insertStarBurst(anchor);
  }

  var starTl = gsap.timeline();
  starTl.to("#thumbs-up", {
    duration: 0.5,
    color: "lime",
    rotate: 10,
    scale: 0.4,
  });

  starTl.to("#thumbs-up", {
    duration: 1,
    color: "blue",
    rotate: -10,
    scale: 1.5,
  });
  starTl.addLabel("burst", ">");

  starTl.to("#thumbs-up", {
    duration: 1,
    color: "red",
    rotate: -3,
    scale: 0.9,
  });

  starTl.to("#thumbs-up", {
    duration: 1,
    color: "black",
    rotate: 0,
    scale: 1,
  });

  starTl.fromTo(
    ".starburst-anchor",
    { x: "-50%", y: "-50%" },
    {
      duration: 0.5,
      ease: "power1.in",
      x: function (index, target) {
        let theta = parseFloat(target.getAttribute("data-rot-angle"));
        let width = target.getBoundingClientRect().width;
        console.log(target);
        let value = -(0.5 * width) + ANCHORCIRCLERADIUS * Math.cos(theta);
        console.log(index, "x", value);
        return value;
      },

      y: function (index, target) {
        let theta = parseFloat(target.getAttribute("data-rot-angle"));
        let height = target.getBoundingClientRect().height;

        let value = -(0.5 * height) + ANCHORCIRCLERADIUS * Math.sin(theta);
        console.log(index, "y", value);
        return value;
      },

      rotate: function (index, target) {
        return (
          (parseFloat(target.getAttribute("data-rot-angle")) / Math.PI) * 180
        );
      },

      opacity: 1,
    },

    "burst"
  );

  starTl.to(".star", { duration: 0, x: "-50%", y: "-50%", scale: 0.5 }, ">");

  starTl.to(".star", { duration: 0.1, opacity: 1 }, ">");

  starTl.to(
    ".star",
    {
      duration: 1,
      x: function (index, target) {
        let theta = 60 * (index + 1) * (Math.PI / 180);
        let width = target.getBoundingClientRect().width;
        console.log(target);
        let value = -(0.5 * width) + STARCIRCLERADIUS * Math.cos(theta);
        console.log(index, "x", value);
        return value;
      },

      y: function (index, target) {
        let theta = 60 * (index + 1) * (Math.PI / 180);
        let height = target.getBoundingClientRect().height;

        let value = -(0.5 * height) + STARCIRCLERADIUS * Math.sin(theta);
        console.log(index, "y", value);
        return value;
      },
    },
    ">"
  );

  starTl.to(".starburst-anchor", { duration: 0.25, opacity: 0 }, ">");
}

function insertStarBurst(target) {
  for (let i = 0; i < 6; i++) {
    let myDiv = document.createElement("div");
    myDiv.innerHTML = STARMARKUP.trim();

    let star = myDiv.firstChild;

    star.setAttribute("data-key", i);
    star.classList.add("star");

    target.appendChild(star);
  }
}

function insertAnchors() {
  const container = document.getElementById("like-button");
  for (let i = 0; i < 4; i++) {
    let theta = (360 / 4) * (i + 1) * (Math.PI / 180);

    let myDiv = document.createElement("div");
    myDiv.innerHTML = ANCHORMARKUP.trim();

    let anchor = myDiv.firstChild;
    anchor.setAttribute("data-rot-angle", theta);
    anchor.classList.add("starburst-anchor");
    container.appendChild(anchor);
  }
}

document.getElementById("like-button").addEventListener("click", animate);
