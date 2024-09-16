document.addEventListener('DOMContentLoaded', function () {
    // Charger les compétences
    fetch('skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');
            data.skills.forEach(skill => {
                skillElement = document.createElement('img');
                skillElement.src = skill.icon; 
                skillElement.alt = 'Skill Icon';
                skillElement.classList.add('skill-icon');
                skillsContainer.appendChild(skillElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement des compétences :', error);
        });

    // Charger les projets
    fetch('projets.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('project');
            const projectsList = document.createElement('div');
            projectsList.className = 'projects-list';

            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project';

                const skills = project.skills.map(skill => `<i class="${skill}"></i>`).join(' ');

                projectElement.innerHTML = `
                    <a href="${project.github}" target="_blank"> 
                        <img src="${project.img}" alt="${project.title} image" class="project-img"/>
                    </a>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="skills">${skills}</div>
                    <a href="${project.github}" class="github-link" target="_blank">Voir sur GitHub</a>
                `;
                projectsList.appendChild(projectElement);
            });

            container.appendChild(projectsList);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des projets:', error);
        });

});
