const tileArray = document.querySelectorAll(".elementTile");
const modalContainer = document.querySelector(".modalContainer");
const closeButton = document.querySelector(".closeButton");
const previousButton = document.querySelector(".previousButton");
const nextButton = document.querySelector(".nextButton");
const modalFactLabel = document.querySelector(".modalFactLabel");
const elementalGroup = document.querySelector(".elementalGroup");
const elementState = document.querySelector(".elementState");
const modalLabels = document.querySelectorAll(".modalLabel");

const modalHeading = document.querySelector(".modalHeading");
const modalElementSymbol = document.querySelector(".modalElementSymbol");
const atomicNumber = document.querySelector(".atomicNumber");
const yearDiscovered = document.querySelector(".yearDiscovered");
const elementFacts = document.querySelector(".elementFacts");
const elementHistory = document.querySelector(".elementHistory");
const url = 'https://periodictable.p.rapidapi.com/';

//variable to check if the user has clicked on a tile yet , will update with the value of the clicked tile 
let selectedTileIndex = null;

//a for loop to add the event listener to each element tile
for (let i = 0; i < tileArray.length; i++) {
    const tile = tileArray[i];

    //Variable to assign the element number of the clicked tile, as the tiles in the tile array are not in the same ordr as the element numbers,
    // Element numbers will be needed to render the displayed info from the API 
    const clickedElementNumber = tile.querySelector(".elementNumber").innerText;
    const clickedElementalGroup = tile.getAttribute("title");

    tile.addEventListener("click", () => {

        //make the modal visible
        modalContainer.style.display = "block";
        selectedTileIndex = i;

        //details from the API page API KEY HOLDER: ABHIMANYU
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '34b4c69378msh16d30fbfbc82ec4p1d27c7jsncf6028fa4535',
                'X-RapidAPI-Host': 'periodictable.p.rapidapi.com'
            }
        };

        //fetch the data from the periodicTable API
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                return result;
            } catch (error) {
                console.error(error);
            }
        };

        const allElements = fetchData();

        allElements.then(result => {
            const parsedResult = JSON.parse(result);
            const clickedElement = parsedResult[clickedElementNumber - 1];

            // change the innerText and innerHTML to the relevant info for the element in question
            modalElementSymbol.innerText = clickedElement.symbol;
            modalHeading.innerText = clickedElement.name;
            atomicNumber.innerText = clickedElement.atomicNumber;
            elementalGroup.innerText = clickedElementalGroup;
            elementState.innerText = clickedElement.standardState;
            yearDiscovered.innerText = clickedElement.yearDiscovered;


            //conditional to change the heading border colours depending on the element being rendered. 
            if (clickedElementalGroup === "Non-Metal") {
                modalElementSymbol.style.borderColor = "rgb(251, 251, 137)";
                modalHeading.style.borderBottomColor = "rgb(251, 251, 137)";
            }
            else if (clickedElementalGroup === "Noble Gas") {
                modalElementSymbol.style.borderColor = "rgb(255, 162, 126)";
                modalHeading.style.borderBottomColor = "rgb(255, 162, 126)";

            }
            else if (clickedElementalGroup === "Alkali Metal") {
                modalElementSymbol.style.borderColor = "rgb(204, 95, 95)";
                modalHeading.style.borderBottomColor = "rgb(204, 95, 95)";
            }
            else if (clickedElementalGroup === "Alkaline Earth Metal") {
                modalElementSymbol.style.borderColor = "rgb(141, 41, 235)";
                modalHeading.style.borderBottomColor = "rgb(141, 41, 235)";
            }
            else if (clickedElementalGroup === "Metalloid") {
                modalElementSymbol.style.borderColor = "rgb(49, 169, 49)";
                modalHeading.style.borderBottomColor = "rgb(49, 169, 49)";
            }
            else if (clickedElementalGroup === "Post Transition Metal") {
                modalElementSymbol.style.borderColor = "rgb(161, 251, 27)";
                modalHeading.style.borderBottomColor = "rgb(161, 251, 27)";
            }
            else if (clickedElementalGroup === "Halogen") {
                modalElementSymbol.style.borderColor = " yellow";
                modalHeading.style.borderBottomColor = " yellow";
            }
            else if (clickedElementalGroup === "Transition Metal") {
                modalElementSymbol.style.borderColor = " rgb(71, 203, 247)";
                modalHeading.style.borderBottomColor = " rgb(71, 203, 247)";
            }
            else if (clickedElementalGroup === "Lanthanide") {
                modalElementSymbol.style.borderColor = " rgb(82, 82, 236)";
                modalHeading.style.borderBottomColor = " rgb(82, 82, 236)";
            }
            else if (clickedElementalGroup === "Actinide") {
                modalElementSymbol.style.borderColor = "rgb(244, 171, 60);";
                modalHeading.style.borderBottomColor = "rgb(244, 171, 60);";
            }

            //conditional in a forEach to change the colour of the modal labels depending on the colour of the class of element being rendered.
            modalLabels.forEach(label => {
                if (clickedElementalGroup === "Non-Metal") {
                    label.style.color = "rgb(251, 251, 137)";
                } else if (clickedElementalGroup === "Noble Gas") {
                    label.style.color = "rgb(255, 162, 126)";
                } else if (clickedElementalGroup === "Alkali Metal") {
                    label.style.color = "rgb(204, 95, 95)";
                } else if (clickedElementalGroup === "Alkaline Earth Metal") {
                    label.style.color = "rgb(141, 41, 235)";
                } else if (clickedElementalGroup === "Metalloid") {
                    label.style.color = "rgb(49, 169, 49)";
                } else if (clickedElementalGroup === "Post Transition Metal") {
                    label.style.color = "rgb(161, 251, 27)";
                } else if (clickedElementalGroup === "Halogen") {
                    label.style.color = "rgb(218, 255, 54)";
                } else if (clickedElementalGroup === "Transition Metal") {
                    label.style.color = "rgb(71, 203, 247)";
                } else if (clickedElementalGroup === "Lanthanide") {
                    label.style.color = "rgb(82, 82, 236)";
                } else if (clickedElementalGroup === "Actinide") {
                    label.style.color = "rgb(244, 171, 60)";
                }
            });


            // Not all elements on the API call have facts, If there are none, then dont show any on the page
            if (clickedElement.facts === "") {
                modalFactLabel.style.display = "none";
                elementFacts.innerText = "";
            } else {

                modalFactLabel.style.display = "block"
                //using DOMpurify to sanitise the data going into the innerHTML to prevent scripting attacks
                elementFacts.innerHTML = `${DOMPurify.sanitize(clickedElement.facts)}`;
            }
            //using DOMpurify to sanitise the data going into the innerHTML to prevent scripting attacks
            elementHistory.innerHTML = `${DOMPurify.sanitize(clickedElement.history)}`;

        });
    });
}




// Function for when the previous button is clicked 
const handlePreviousButtonClick = () => {
    if (selectedTileIndex !== null) {
        // Decrease the index number to get the previous element
        selectedTileIndex--;

        if (selectedTileIndex < 0) {
            // If index is smaller than 0, set it to the maximum index number , to go to the last element 
            selectedTileIndex = tileArray.length - 1;
        }

        const previousTile = tileArray[selectedTileIndex];
        // Trigger a click event on the previous tile to populate it
        previousTile.click();
    }
};

modalContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("moreButton")) {
        handleMoreButtonClick();
    }
});



// Function for when the More Info button is clicked
const handleMoreButtonClick = () => {
    if (selectedTileIndex !== null && tileArray[selectedTileIndex]) {
        const selectedTile = tileArray[selectedTileIndex];
        const elementName = selectedTile.querySelector(".elementName").textContent.trim().toLowerCase();

        // Redirect to the details page for that element
        window.location.href = `details/${elementName}.html`;
    }
};




// Function for when the next button is clicked 
const handleNextButtonClick = () => {
    if (selectedTileIndex !== null) {

        // Increase the index number to get the next element
        selectedTileIndex++;
        if (selectedTileIndex >= tileArray.length) {
            // If index is larger than the tileArray length, reset it to 0, which will render the first element again
            selectedTileIndex = 0;
        }

        const nextTile = tileArray[selectedTileIndex];
        // Trigger a click event on the next tile to populate it
        nextTile.click();
    }
};

// Add eventlistener to the buttons to listen for a mouse click 
previousButton.addEventListener("click", handlePreviousButtonClick);
nextButton.addEventListener("click", handleNextButtonClick);

//Adding a keydown event listener to the document
document.addEventListener("keydown", (event) => {
    // Check if the left arrow key was pressed
    if (event.key === "ArrowLeft") {
        handlePreviousButtonClick();
    }

    // Check if the right arrow key was pressed
    if (event.key === "ArrowRight") {
        handleNextButtonClick();
    }
});


//
closeButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
});

//highlighting the element tile when the mouse is hovering on labels


const a = document.querySelector(".alkali-Metal");
const b= document.querySelector(".alkaline-earth-metal");
const c = document.querySelector(".actinides");
const d = document.querySelector(".halogens");
const e = document.querySelector(".lanthanides");
const f = document.querySelector(".metalloids");
const g = document.querySelector(".noble-gases");
const h = document.querySelector(".other-non-metals");
const i = document.querySelector(".post-transition-metals");
const j = document.querySelector(".transition-metal");

const a2= document.querySelectorAll(".alkaliMetal");
const b2= document.querySelectorAll(".alkalineEarthMetal");
const c2 = document.querySelectorAll(".actinide");
const d2 = document.querySelectorAll(".halogen");
const e2 = document.querySelectorAll(".lanthanide");
const f2 = document.querySelectorAll(".metalloid");
const g2 = document.querySelectorAll(".nobleGas");
const h2 = document.querySelectorAll(".nonMetal");
const i2 = document.querySelectorAll(".postTransitionMetal");   
const j2 = document.querySelectorAll(".transitionMetal");

function applyHoverEffect(label, elements) {
    label.addEventListener("mouseover", () => {
        elements.forEach(el => {
            el.style.backgroundColor = "#ffffff";
            el.style.color ="#000000"; 
            el.style.borderColor = "#000000";
        });
    });

    label.addEventListener("mouseout", () => {
        elements.forEach(el => {
            el.style.backgroundColor = ""; 
            el.style.color="";
            el.style.borderColor = "";
        });
    });
}

// Apply for each group
applyHoverEffect(a, a2);
applyHoverEffect(b, b2);
applyHoverEffect(c, c2);
applyHoverEffect(d, d2);
applyHoverEffect(e, e2);
applyHoverEffect(f, f2);
applyHoverEffect(g, g2);
applyHoverEffect(h, h2);
applyHoverEffect(i, i2);
applyHoverEffect(j, j2);


//search by filtering the elements
const searchInput = document.getElementById("elementSearch");
const groupFilter = document.getElementById("groupFilter");
const searchTypeSelector = document.getElementById("searchTypeSelector");

searchInput.addEventListener("input", applyFilters);
groupFilter.addEventListener("change", applyFilters);
searchTypeSelector.addEventListener("change", applyFilters);

function applyFilters() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedGroup = groupFilter.value.trim().toLowerCase();
    const selectedSearchType = searchTypeSelector.value;

    const tileArray = Array.from(document.querySelectorAll(".elementTile"));
    let anyVisible = false;

    tileArray.forEach(tile => {
        const name = tile.querySelector(".elementName").textContent.trim().toLowerCase();
        const symbol = tile.querySelector(".elementSymbol").textContent.trim().toLowerCase();
        const number = tile.querySelector(".elementNumber").textContent.trim().toLowerCase();
        const group = (tile.getAttribute("title") || "").trim().toLowerCase();

        let matchesSearch = false;

        if (!searchTerm) {
            matchesSearch = true; // No search term shows all
        } else if (selectedSearchType === "name") {
            matchesSearch = name.startsWith(searchTerm);
        } else if (selectedSearchType === "symbol") {
            matchesSearch = symbol.startsWith(searchTerm);
        } else if (selectedSearchType === "number") {
            matchesSearch = number.startsWith(searchTerm);
        } else {
            // "all" search: check if any startsWith
            matchesSearch =
                name.startsWith(searchTerm) ||
                symbol.startsWith(searchTerm) ||
                number.startsWith(searchTerm);
        }

        // Group match: show all if selectedGroup is 'all'
        const matchesGroup = selectedGroup === "all" || group === selectedGroup;

        const isVisible = matchesSearch && matchesGroup;

        tile.style.visibility = isVisible ? "visible" : "hidden";
        tile.style.opacity = isVisible ? "1" : "0";
        tile.style.pointerEvents = isVisible ? "auto" : "none";

        if (isVisible) anyVisible = true;
    });

    // Handle no results message visibility
    const noResults = document.getElementById("noResultsMessage");
    if (noResults) {
        noResults.style.display = anyVisible ? "none" : "block";
    }

    // Handle legends visibility
    const legends = document.querySelectorAll(".legend-box");
    const isFiltering = searchTerm.length > 0 || selectedGroup !== "all";
    legends.forEach(legend => {
        legend.style.display = isFiltering ? "none" : "";
    });
}

