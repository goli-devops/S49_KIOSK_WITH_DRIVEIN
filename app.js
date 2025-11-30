setInterval(() => {
  let date = new Date()

  // Options for formatting the date and time
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }

  // Format the date and time according to the options
  let newDate = date.toLocaleString("en-US", options)
  document.getElementById("date-el").textContent = newDate

  // Determine rate logic
  const currentDay = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = date.getHours() // 17 = 5pm, 18 = 6pm

  // Get the elements for weekday and weekend rates
  let weekdayRateElement = document.getElementById("weekday")
  let driveinWeekdayElement = document.getElementById("weekday-drivein")
  let weekendRateElement = document.getElementById("weekend")
  let driveinWeekendElement = document.getElementById("weekend-drivein")
  let onp = document.getElementById("onp")
  // let sixPro = document.getElementById("six")
  let driveInOnp = document.getElementById("drivein-onp")
  let regularTen = document.getElementById("regular-ten")
  let driveinRegularTen = document.getElementById("drivein-regular-ten")
  // let driveinSix = document.getElementById("drivein-six")

  // ---- HOLIDAY LIST ----
  const holidayDates = [
    "2025-06-06", // Eid’l Adha (estimated)
    "2025-06-12", // Independence Day
    "2025-08-21", // Ninoy Aquino Day
    "2025-08-25", // National Heroes Day
    "2025-11-01", // All Saints' Day
    "2025-11-30", // Bonifacio Day
    "2025-12-08", // Feast of the Immaculate Conception
    "2025-12-24", // Christmas Eve
    "2025-12-25", // Christmas Day
    "2025-12-30", // Rizal Day
    "2025-12-31", // New Year's Eve
  ]

  function isHolidayNow() {
    for (let dateStr of holidayDates) {
      // Holiday starts at 12:00 AM of the date
      const holidayStart = new Date(`${dateStr}T00:00:00`)

      // Holiday ends at 11:59:59 PM of the same day
      const holidayEnd = new Date(`${dateStr}T23:59:59`)

      if (date >= holidayStart && date <= holidayEnd) {
        return true
      }
    }
    return false
  }

  // ---- RATE DISPLAY LOGIC ----
  if (isHolidayNow()) {
    // HOLIDAY RATE
    weekendRateElement.style.display = "block"
    driveinWeekendElement.style.display = "block"
    document.getElementById("holiday-weekend").textContent = "HOLIDAY RATE"
    document.getElementById("holiday-weekend-drivein").textContent =
      "HOLIDAY RATE"
    weekdayRateElement.style.display = "none"
    driveinWeekdayElement.style.display = "none"
  } else if (
    // WEEKEND: Friday 6:00am to Sunday 5:59pm
    (currentDay === 5 && currentHour >= 6) || // Friday from 6:00am onwards
    currentDay === 6 || // Saturday all day
    currentDay === 0 // Sunday before 6:00pm
  ) {
    // WEEKEND RATE
    weekendRateElement.style.display = "block"
    driveinWeekendElement.style.display = "block"
    weekdayRateElement.style.display = "none"
    driveinWeekdayElement.style.display = "none"
  } else {
    // WEEKDAY RATE
    weekdayRateElement.style.display = "block"
    driveinWeekdayElement.style.display = "block"
    weekendRateElement.style.display = "none"
    driveinWeekendElement.style.display = "none"
  }

  // Show ONP (Overnight Promo) from 8:00pm to 5:59am, Sunday to Friday
  if (
    // Sunday 9:00pm to midnight
    (currentDay === 1 && currentHour >= 18) ||
    // Monday to Thursday 9:00pm to midnight
    (currentDay >= 1 && currentDay <= 4 && currentHour >= 18) ||
    // Monday to Friday 12:00am to 5:59am
    (currentDay >= 1 && currentDay <= 5 && currentHour < 6)
  ) {
    regularTen.style.display = "none"
    driveinRegularTen.style.display = "none"
    onp.style.display = "table-row"
    // sixPro.style.display = "none"
    // driveinSix.style.display = "none"
    driveInOnp.style.display = "table-row"
  } else {
    onp.style.display = "none"
    // sixPro.style.display = "table-row"
    // driveinSix.style.display = "table-row"
    driveInOnp.style.display = "none"
    regularTen.style.display = "table-row"
    driveinRegularTen.style.display = "table-row"
  }
}, 1000) // Update every second

// DRIVEIN FUNCTIONS

let driveinBtn = document.getElementById("drivein")
let modal2 = document.getElementById("modal2")
let container = document.getElementById("container")
let walkinBanner = document.getElementById("walkin-banner")

driveinBtn.addEventListener("click", function () {
  let modal = document.getElementById("modal")
  if (modal2.style.display === "block") {
    // Hide driveinContainer and show container
    modal2.style.display = "none"
    container.style.filter = "none"
    driveinBtn.textContent = "DRIVE-IN" // Change back to original text
    walkinBanner.textContent = "WALK-IN ROOM RATES"
    modal.style.display = "block" // display walk-in
  } else {
    // Show driveinContainer and blur container
    modal2.style.display = "block"
    // container.style.filter = "blur(100px)" // Adjust blur intensity
    driveinBtn.textContent = "WALK-IN" // Change text
    walkinBanner.textContent = "DRIVE-IN ROOM RATES"
    modal.style.display = "none"
  }
})

// ZOOM WEBPAGE IF CLICK ANYWHERE
document.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    // If not in fullscreen, enter fullscreen mode
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error: ${err.message}`)
    })
  }
  // If already in fullscreen, do nothing
})

// DISABLE RIGHT CLICK
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault()
// })



