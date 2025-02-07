document.addEventListener('DOMContentLoaded', function () {
    let skillsData = {};

    // Charger skills depuis json
    fetch('skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');
            data.skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.classList.add('skill-item');

                const imgElement = document.createElement('img');
                imgElement.src = skill.icon;
                imgElement.alt = skill.name;
                imgElement.classList.add('skill-icon');

                // Ajout du texte (nom du skill) caché au départ
                const skillText = document.createElement('span');
                skillText.classList.add('skill-text');
                skillText.innerText = skill.name;

                skillElement.appendChild(imgElement);
                skillElement.appendChild(skillText);
                skillsContainer.appendChild(skillElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des compétences :', error);
        });

    // load projet et separation de-da par type
    fetch('projets.json')
        .then(response => response.json())
        .then(data => {
            const analystContainer = document.getElementById('analyst-list');
            const engineerContainer = document.getElementById('engineer-list');

            for (const type in data) {
                data[type].forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project';

                    const projectSkills = project.skills.map(skillPath => {
                        return `<img src="${skillPath}" alt="Skill icon" class="project-skill-icon" />`;
                    }).join(' ');

                    projectElement.innerHTML = `
                        <a href="${project.github}" target="_blank">
                            <img src="${project.img}" alt="${project.title}" class="project-img"/>
                        </a>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="skills">${projectSkills}</div>
                        <a href="${project.github}" class="github-link" target="_blank">Voir sur GitHub</a>
                    `;

                    if (type === "data_analyst") {
                        analystContainer.appendChild(projectElement);
                    } else if (type === "data_engineer") {
                        engineerContainer.appendChild(projectElement);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des projets:', error);
        });
});