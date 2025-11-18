
"use strict";

// ===== 1) Вставка ПІБ у елемент за id =====
const FULL_NAME = "HENRY L.";

document.addEventListener("DOMContentLoaded", () => {
    insertFullName();
    initSectionToggles();
    renderExperience();
});

function insertFullName() {
    const nameEl = document.getElementById("personName");
    if (!nameEl) return;
    nameEl.textContent = FULL_NAME; // тільки текст, без HTML
}

// ===== 2) Стрілки для згортання блоків =====
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

// ===== 3) Масив + динамічна генерація досвіду роботи =====
const experienceData = [
    {
        period: "2021–Present",
        company: "Creative Agency",
        location: "Chicago",
        position: "Senior Web Designer",
        description:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        period: "2018–2021",
        company: "Creative Market",
        location: "United Kingdom",
        position: "Graphic Designer",
        description:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        period: "2016–2018",
        company: "Marketing Agency",
        location: "United Kingdom",
        position: "Marketing Manager",
        description:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        period: "2013–2016",
        company: "Creative Agency",
        location: "Chicago",
        position: "Junior Web Designer",
        description:
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
            "when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
];

function renderExperience() {
    const container = document.getElementById("experienceContainer");
    if (!container) return;

    container.innerHTML = ""; // очищення контейнера

    experienceData.forEach((item) => {
        const article = document.createElement("article");
        article.className = "exp-item";

        const dateDiv = document.createElement("div");
        dateDiv.className = "exp-item__date";
        dateDiv.textContent = item.period;

        const contentDiv = document.createElement("div");
        contentDiv.className = "exp-item__content";

        const topBox = document.createElement("div");

        const companyDiv = document.createElement("div");
        companyDiv.className = "exp-item__company";
        companyDiv.textContent = item.company;

        const locationDiv = document.createElement("div");
        locationDiv.className = "exp-item__location";
        locationDiv.textContent = item.location;

        topBox.appendChild(companyDiv);
        topBox.appendChild(locationDiv);

        const positionH3 = document.createElement("h3");
        positionH3.className = "exp-item__position";
        positionH3.textContent = item.position;

        const descrP = document.createElement("p");
        descrP.className = "exp-item__description";
        descrP.textContent = item.description;

        contentDiv.appendChild(topBox);
        contentDiv.appendChild(positionH3);
        contentDiv.appendChild(descrP);

        article.appendChild(dateDiv);
        article.appendChild(contentDiv);

        container.appendChild(article);
    });
}
