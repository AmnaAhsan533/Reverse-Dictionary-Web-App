let searchButton = document.getElementById("searchButton");
let inputField = document.getElementById("searchInput");

function fetchData(searchInput) {
    fetch(`https://api.datamuse.com/words?ml=${searchInput}`)
        .then((response) => response.json())
        .then((data) => displayResults(data))
        .catch((error) => console.error("Error fetching data:", error));
}

searchButton.addEventListener("click", function() {
    let searchInput = inputField.value;
    fetchData(searchInput);
});

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const filtered = data.filter(item => item.word.length > 3); // just a simple filter to exclude very short words

    if (filtered.length === 0) {
        resultsDiv.innerHTML = "<p>No clear matches found.</p>";
        return;
    }

    filtered.slice(0, 3).forEach(item => {
        const wordElement = document.createElement("p");
        wordElement.textContent = item.word;
        resultsDiv.appendChild(wordElement);
    });
    resultsDiv.style.display = "block";
}

searchButton.addEventListener("click", function() {
    let searchInput = inputField.value.trim();
    if (searchInput === "") {
        alert("Please enter a description first.");
        return;
    }
    fetchData(searchInput);
});





