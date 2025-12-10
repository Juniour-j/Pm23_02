"use strict";


let resumeData = null;

document.addEventListener("DOMContentLoaded", () => {
    initSectionToggles();
    loadResumeData();
});


function loadResumeData() {
    fetch("data.json")
        .then((response) => {
            if (!response.ok) {

                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then((data) => {

            resumeData = data;


            if (data.personal) {
                insertFullNameFromData(data.personal);
            }
            if (Array.isArray(data.jobs)) {
                renderExperience(data.jobs);
            }
        })
        .catch((error) => {
            console.error("Помилка завантаження data.json:", error);
            showDataError("Не вдалося завантажити дані резюме. Спробуйте оновити сторінку.");
        });
}


function insertFullNameFromData(personal) {
    const nameEl = document.getElementById("personName");
    if (!nameEl || !personal) return;

    const first = personal.firstName || "";
    const last = personal.lastName || "";
    const fullName = (first + " " + last).trim();

    if (!fullName) return;


    nameEl.textContent = fullName;
}


function renderExperience(jobs) {
    const container = document.getElementById("experienceContainer");
    if (!container || !Array.isArray(jobs)) return;


    container.innerHTML = "";

    jobs.forEach((job) => {
        const article = document.createElement("article");
        article.className = "exp-item";

        const dateDiv = document.createElement("div");
        dateDiv.className = "exp-item__date";
        dateDiv.textContent = job.period || "";

        const contentDiv = document.createElement("div");
        contentDiv.className = "exp-item__content";

        const topBox = document.createElement("div");

        const companyDiv = document.createElement("div");
        companyDiv.className = "exp-item__company";
        companyDiv.textContent = job.company || "";

        const locationDiv = document.createElement("div");
        locationDiv.className = "exp-item__location";
        locationDiv.textContent = job.location || "";

        topBox.appendChild(companyDiv);
        topBox.appendChild(locationDiv);

        const positionH3 = document.createElement("h3");
        positionH3.className = "exp-item__position";
        positionH3.textContent = job.position || "";

        const descrP = document.createElement("p");
        descrP.className = "exp-item__description";
        descrP.textContent = job.description || "";

        contentDiv.appendChild(topBox);
        contentDiv.appendChild(positionH3);
        contentDiv.appendChild(descrP);

        article.appendChild(dateDiv);
        article.appendChild(contentDiv);

        container.appendChild(article);
    });
}

/**
 * Службове повідомлення при помилці завантаження
 * — або пишемо в #dataError, або fallback на alert
 */
function showDataError(message) {
    const box = document.getElementById("dataError");
    if (box) {
        box.textContent = message;
        box.style.display = "block";
    } else {
        alert(message);
    }
}


function initSectionToggles() {
    const buttons = document.querySelectorAll('[data-toggle="section"]');

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            if (!targetId) return;

            const body = document.getElementById(targetId);
            if (!body) return;

            body.classList.toggle("is-hidden");
            btn.classList.toggle("toggle-arrow--rotated");

            const expanded = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", String(!expanded));
        });
    });
}
