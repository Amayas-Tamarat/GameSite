
features.forEach(feature => {
    const featureDiv = document.createElement('div');
    featureDiv.classList.add('feature');
    featureDiv.innerHTML = `
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
    `;
    featuresList.appendChild(featureDiv);
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50, // Offset for header
            behavior: 'smooth'
        });
    });
});



