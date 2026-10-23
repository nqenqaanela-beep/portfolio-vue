const { createApp } = Vue;

const WEB3FORMS_ACCESS_KEY = '69de037d-1dd6-470d-93f0-062e5f50a3ef';

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
          image: 'assets/projects/portfolio-project.jpeg'
        },
        {
          title: 'GigaBridge',
          image: 'assets/projects/gigabridge-project.jpeg'
        },
        {
          title: 'ModernTech HR directory',
          image: 'assets/projects/moderntech-project.jpeg'
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
      },
      formStatus: '',
      isSubmitting: false
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
    async submitForm() {
      if (this.isSubmitting) return;

      const { name, email, subject, message } = this.form;
      this.isSubmitting = true;
      this.formStatus = '';

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name,
            email,
            subject,
            message
          })
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || `Request failed with status ${response.status}.`);
        }

        this.formStatus = 'Thanks! Your message has been sent.';
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch (error) {
        console.error('Contact form submission failed.', error);
        this.formStatus = error instanceof Error
          ? `Unable to send your message: ${error.message}`
          : 'Unable to send your message. Please try again later.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}).mount('#app');
