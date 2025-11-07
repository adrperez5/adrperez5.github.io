// main.js

class PortfolioWebsite {
    constructor() {
        // Data
        this.projects = [
            {
                id: 1,
                title: "Bank Transaction Core Program",
                description: "Built a full-stack e-commerce platform using React and Node.js",
                technologies: ["React", "Node.js", "MongoDB", "Express"],
                image: "path/to/image.jpg",
                link: "https://project-link.com",
                details: "Detailed description of the project..."
            },
            {
                id: 2,
                title: "Multimodal Clipping AI",
                description: "",
                technologies: [""],
                image: "",
                link: "",
                details: ""
            },
            {
                id: 3,
                title: "Chess Extension for Accessibility",
                description: "",
                technologies: [""],
                image: "",
                link: "",
                details: ""
            },
            {
                id: 4,
                title: "Search Engine",
                description: "",
                technologies: [""],
                image: "",
                link: "",
                details: ""
            },
            {
                id: 5,
                title: "Social Media Application",
                description: "",
                technologies: [""],
                image: "",
                link: "",
                details: ""
            },
            {
                id: 6,
                title: "Asteroid game",
                description: "",
                technologies: [""],
                image: "",
                link: "",
                details: ""
            }
        ];

        this.experience = [
            {
                id: 1,
                company: "Tech Company",
                role: "Senior Developer",
                period: "2020 - Present",
                description: "Led development team of 5 engineers...",
                achievements: [
                    "Increased system performance by 40%",
                    "Implemented new CI/CD pipeline"
                ]
            },
        ];

        this.education = {
                institution: "University of Michigan - Ann Arbor",
                degree: "Bachelor of Computer Science",
                period: "2019 - 2024",
                courses: ["Software Engineering", "Web Systems", "Database Management Systems"]
            }

        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.loadContent();
        this.setupAnimations();
        this.initTypeWriter();
    }

    setupEventListeners() {
        // Smooth scrolling
        document.querySelectorAll('.website a').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Modal handling
        document.querySelector('.close-button').addEventListener('click', 
            () => this.closeModal());
    }

    loadContent() {
        // Load Projects
        const projectsContainer = document.getElementById('projectsContainer');
        this.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });

        // Load Experience
        const experienceContainer = document.getElementById('experienceContainer');
        this.experience.forEach(exp => {
            const expCard = this.createExperienceCard(exp);
            experienceContainer.appendChild(expCard);
        });

        // Load Education
        const educationContainer = document.getElementById('educationContainer');
        this.education.forEach(edu => {
            const eduCard = this.createEducationCard(edu);
            educationContainer.appendChild(eduCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        card.addEventListener('click', () => this.showProjectDetails(project));
        return card;
    }

    createExperienceCard(experience) {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.innerHTML = `
            <h3>${experience.company}</h3>
            <h4>${experience.role}</h4>
            <p class="period">${experience.period}</p>
            <p>${experience.description}</p>
            <ul>
                ${experience.achievements.map(achievement => 
                    `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        return card;
    }

    createEducationCard(education) {
        const card = document.createElement('div');
        card.className = 'education-card';
        card.innerHTML = `
            <h3>${education.institution}</h3>
            <h4>${education.degree}</h4>
            <p class="period">${education.period}</p>
            <div class="achievements">
                ${education.achievements.map(achievement => 
                    `<span class="achievement-tag">${achievement}</span>`).join('')}
            </div>
        `;
        return card;
    }

    showProjectDetails(project) {
        const modal = document.getElementById('detailModal');
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}">
            <p>${project.details}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('detailModal').style.display = 'none';
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    initTypeWriter() {
        const element = document.querySelector('.typing-effect');
        const text = "Hi, I'm [Your Name]";
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }

        type();
    }
}

// Initialize the portfolio website
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});