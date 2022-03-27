const navBtn = document.querySelectorAll(".nav-btn");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.id;
let tipe = params.tipe;
if (!value) value = 1;
if (!tipe) tipe = "reading";

const totalQuestion = document.querySelectorAll(".answered table tr").length;

if (value <= 1) {
  document.getElementById("btn-prev").disabled = true;
}
if (value >= totalQuestion) {
  document.getElementById("btn-next").disabled = true;
}

navBtn.forEach((n) => {
  n.addEventListener("click", (e) => {
    if (n.dataset.button == "next") {
      window.location.href = `?id=${parseInt(value) + 1}`;
    }
    if (n.dataset.button == "prev") {
      window.location.href = `?id=${parseInt(value) - 1}`;
    }
  });
});

let font = 1;
document.querySelectorAll(".font-size-control").forEach((c) => {
  c.addEventListener("click", function (e) {
    if (e.target.id == "font-min") {
      font = font - 0.1;
      document.querySelector(".column1").style.fontSize = `${font}em`;
    }
    if (e.target.id == "font-plus") {
      font = font + 0.1;
      document.querySelector(".column1").style.fontSize = `${font}em`;
    }
  });
});

const cr = document.querySelector(".cr a");
("https://facebook.com/mimamch28" == cr.href && "mimamch" == cr.textContent) ||
  (window.location = "https://facebook.com/mimamch28");

function reading(time) {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + time;

  if (!window.sessionStorage.startTest) {
    window.sessionStorage.startTest = countDownDate;
  }

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = window.sessionStorage.startTest - now;

    // Time calculations for days, hours, minutes and seconds

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.querySelector(".reading-box .remairing-time span").textContent =
      minutes + ":" + seconds + "";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.querySelector(".reading-box .remairing-time span").innerHTML =
        "EXPIRED";
      alert("waktu habis");
    }
  }, 1000);
}

// window.sessionStorage.clear();

// console.log(window.sessionStorage);

// reading(25000);
// window.localStorage.clear();

let history = {
  id: 1,
  reading: {
    startTime: new Date().getTime(),
  },
  listening: {
    startTime: new Date().getTime(),
  },
};

// window.localStorage.setItem("history", JSON.stringify(history));

console.log(window.localStorage);

let historyDatabase = {
  id: 12345,
  reading: {
    startTime: history.reading.startTime,
  },
  listening: {
    startTime: history.listening.startTime,
  },
};

console.log(historyDatabase);
