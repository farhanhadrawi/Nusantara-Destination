document.addEventListener('DOMContentLoaded', function() {
    const ul = document.getElementById("search-results");
    ul.style.display = 'none'
const destinations = [
    { name: "Raja Ampat", link: "rajaampat.html" },
    { name: "Danau Toba", link: "#" },
    { name: "Gunung Bromo", link: "#" },
    { name: "Labuan Bajo", link: "#" },
    { name: "Bali", link: "#" },
    { name: "Sirkuit Mandalika", link: "#" },
    // Add more destinations as needed
  ];
  
  function searchDestinations() {
    const input = document.getElementById("search");
    const filter = input.value.toUpperCase();
    ul.innerHTML = ""; // Clear previous search results
  
    for (const destination of destinations) {
      if (destination.name.toUpperCase().includes(filter)) {
        const li = document.createElement("li");
        li.textContent = destination.name;
        li.addEventListener("click", function() {
          window.location.href = destination.link;
        });
        ul.appendChild(li);
        }
    }

    if (filter === "" ) {
        ul.innerHTML = "";
        ul.style.display = 'none'
    } else {
        ul.style.display = 'block'
    }
  }
  
  document.getElementById("search").addEventListener("input", searchDestinations);
  document.getElementById("search").addEventListener("mouseleave", () => {
    window.addEventListener("click", () => {
        ul.style.display = "none"
    })
  })
});