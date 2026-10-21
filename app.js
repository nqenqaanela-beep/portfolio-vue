const { createApp } = Vue;

createApp({
  data() {
    return {
      navItems: ['About', 'Skills', 'Projects', 'Credentials'],
      skills: [
        { icon: 'html', name: 'HTML', description: 'Semantic structure' },
        { icon: 'css', name: 'CSS', description: 'Responsive interfaces' },
        { icon: 'javascript', name: 'JavaScript', description: 'Interactive experiences' },
        { icon: 'bootstrap', name: 'Bootstrap', description: 'Rapid UI development' },
        { icon: 'git', name: 'Git & GitHub', description: 'Version control' },
        { icon: 'database', name: 'Databases', description: 'Data fundamentals' }
      ],
      projects: [
        {
          title: 'Personal portfolio',
          image: 'assets/projects/portfolio-project.jpeg',
          url: 'https://nqenqaanela-beep.github.io/'
        },
        {
          title: 'GigaBridge',
          image: 'assets/projects/gigabridge-project.jpeg',
          url: 'https://leratoyapi.github.io/'
        },
        {
          title: 'ModernTech HR directory',
          image: 'assets/projects/moderntech-project.jpeg',
          url: 'https://modern-tech-solutions.netlify.app/'
        }
      ],
      projectIndex: 0,
      projectSlideshowTimer: null,
      activeCertificate: null,
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  computed: {
    activeProject() {
      return this.projects[this.projectIndex];
    }
  },
  mounted() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.projectSlideshowTimer = window.setInterval(this.advanceProject, 6000);
    }
  },
  beforeUnmount() {
    window.clearInterval(this.projectSlideshowTimer);
  },
  methods: {
    advanceProject() {
      this.projectIndex = (this.projectIndex + 1) % this.projects.length;
    },
    resetProjectSlideshow() {
      if (this.projectSlideshowTimer === null) return;
      window.clearInterval(this.projectSlideshowTimer);
      this.projectSlideshowTimer = window.setInterval(this.advanceProject, 6000);
    },
    nextProject() {
      this.advanceProject();
      this.resetProjectSlideshow();
    },
    previousProject() {
      this.projectIndex = (this.projectIndex - 1 + this.projects.length) % this.projects.length;
      this.resetProjectSlideshow();
    },
    goToProject(index) {
      this.projectIndex = index;
      this.resetProjectSlideshow();
    },
    openCertificate(path, title) {
      this.activeCertificate = { path, title };
      this.$nextTick(() => this.$refs.certificateDialog.showModal());
    },
    submitForm() {
      const { name, email, subject, message } = this.form;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:nqenqaanela@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  }
}).mount('#app');
