let getAyahButton = document.getElementById("getayahbutton")
let surahInput = document.getElementById("surahinput")
let ayahInput = document.getElementById("ayahinput")
let arabictext = document.getElementById("arabictext")
let englishtext = document.getElementById("englishtext")
let outputCard = document.getElementById("outputcard")

outputCard.style.display = "none";

function isOutputCardVisible() {
    return outputCard && outputCard.offsetParent !== null
}

async function fetchArabicText(surah, ayah) {
    try {
        const response = await fetch("https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=" + surah + ":" + ayah);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
    }
  
    const json = await response.json();
    arabictext.textContent = json.verses[0].text_uthmani
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchEnglishText(surah, ayah) {
    try {
        const response = await fetch("https://api.quran.com/api/v4/quran/translations/203?verse_key=" + surah + ":" + ayah);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
    }
  
    const json = await response.json();
    englishtext.textContent = json.translations[0].text.replace(/<sup[^>]*>.*?<\/sup>/g, "");
    } catch (error) {
        console.error(error.message);
    }
}

getAyahButton.addEventListener("click", function() {
    if (!isNaN(surahInput.value) && surahInput.value >= 1 && !isNaN(ayahInput.value) && ayahInput.value >= 1) {
        if(outputCard.style.display == "none") {
            outputCard.children[0].textContent = "Surah #" + surahInput.value + " : Ayah #" + ayahInput.value
        
            fetchArabicText(surahInput.value, ayahInput.value)
            fetchEnglishText(surahInput.value, ayahInput.value)
            outputCard.style.display = "block"
        } else {
            outputCard.children[0].textContent = "Surah #" + surahInput.value + " : Ayah #" + ayahInput.value
        
            fetchArabicText(surahInput.value, ayahInput.value)
            fetchEnglishText(surahInput.value, ayahInput.value)
        }
    }
})