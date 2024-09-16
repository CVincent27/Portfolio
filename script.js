document.addEventListener('DOMContentLoaded', function () {
    let skillsData = {};

    fetch('skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');
            skillsData = data.skills.reduce((acc, skill) => {
                const skillName = skill.icon.split('/').pop();
                acc[skillName] = skill.icon;

                const skillElement = document.createElement('img');
                skillElement.src = skill.icon;
                skillElement.alt = skillName;
                skillElement.classList.add('skill-icon');
                skillsContainer.appendChild(skillElement);

                return acc;
            }, {});
        })
        .catch(error => {
            console.error('Erreur lors du chargement des compétences :', error);
        });

    fetch('projets.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('project');
            const projectsList = document.createElement('div');
            projectsList.className = 'projects-list';

            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'project';

                const projectSkills = project.skills.map(skillPath => {
                    const skillName = skillPath.split('/').pop();
                    const skillIcon = skillsData[skillName];
                    return skillIcon ? `<img src="${skillIcon}" alt="Skill icon" class="project-skill-icon" />` : '';
                }).join(' ');

                projectElement.innerHTML = `
                    <a href="${project.github}" target="_blank"> 
                        <img src="${project.img}" alt="${project.title} image" class="project-img"/>
                    </a>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="skills">${projectSkills}</div>
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
