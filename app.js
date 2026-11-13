const { createApp } = Vue;

const WEB3FORMS_ACCESS_KEY = '69de037d-1dd6-470d-93f0-062e5f50a3ef';

createApp({
  data() {
    return {
      navItems: ['About', 'Skills', 'Projects', 'Credentials'],
      skills: [
        { icon: 'html', name: 'HTML5', description: 'Semantic markup for accessible web pages' },
        { icon: 'css', name: 'CSS3', description: 'Responsive layouts and visual styling' },
        { icon: 'javascript', name: 'JavaScript', description: 'Interactive browser experiences' },
        { icon: 'react', name: 'React', description: 'Reusable components and modern interfaces' },
        { icon: 'bootstrap', name: 'Bootstrap', description: 'Responsive interface components and grid' },
        { icon: 'firebase', name: 'Firebase', description: 'Authentication and real-time application data' },
        { icon: 'database', name: 'Back-End & Databases', description: 'Server-side concepts and data management' },
        { icon: 'network', name: 'Networking & Cybersecurity', description: 'Network fundamentals and security practices' },
        { icon: 'scrum', name: 'Agile & Scrum', description: 'Scrum framework and iterative project delivery' }
      ],
      credentials: [
        {
          badge: 'Graduate programme',
          meta: '2026',
          title: 'YouthCode Software Development Project',
          description: 'Completed the YouthCode Software Development Project, covering ICT, front-end development, databases, back-end development, e-commerce, and professional development.',
          path: 'assets/certificates/youthcode-project.jpg'
        },
        {
          badge: 'Cisco · Data foundations',
          meta: 'Professional course',
          title: 'Fundamentals of Data Science',
          description: 'Completed Cisco’s Fundamentals of Data Science course, exploring core data science concepts and how data can be used to find insights and inform decisions.',
          path: 'assets/certificates/fundamentals-of-data-science.pdf'
        },
        {
          badge: 'Cisco · Digital security',
          meta: 'Professional course',
          title: 'Networking Basics & Cybersecurity',
          description: 'Completed Cisco training in networking basics and cybersecurity, building an understanding of network fundamentals and essential digital security practices.',
          path: 'assets/certificates/networking-and-cybersecurity.pdf'
        },
        {
          badge: 'Coursera · Scrimba',
          meta: 'Completed November 11, 2026',
          title: 'Learn Firebase',
          description: 'Learned to integrate Firebase into frontend apps, including authentication, security rules, user accounts, and real-time data.',
          image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~ZXG9YBHRMPCS/CERTIFICATE_LANDING_PAGE~ZXG9YBHRMPCS.jpeg',
          verificationUrl: 'https://coursera.org/share/06640015877c4dcf63d3b1825e977cd1'
        },
        {
          badge: 'Coursera',
          meta: 'Completed November 10, 2026',
          title: 'Build Your First React Website',
          description: 'Learned React fundamentals, how to build websites with reusable components, and how to debug React applications.',
          image: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TT5YICDFIRQV/CERTIFICATE_LANDING_PAGE~TT5YICDFIRQV.jpeg',
          verificationUrl: 'https://coursera.org/share/236ee160a9e938609d678fbddbab1fcc'
        },
        {
          badge: 'SCRUMstudy',
          meta: 'Certificate ID 1205779',
          title: 'Scrum Fundamentals Certified',
          description: 'Certified in Scrum fundamentals, including the Scrum framework, core practices, and agile project delivery.',
          image: 'assets/certificates/scrum-fundamentals-certified.jpg',
          verificationUrl: 'https://www.scrumstudy.com/certification/verify?type=SFC&number=1205779',
          issuer: 'SCRUMstudy',
          certificateId: '1205779'
        }
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
      isProjectHovered: false,
      isProjectFocused: false,
      credentialIndex: 0,
      credentialVisibleCount: 3,
      credentialSlideDirection: 'next',
      credentialSlideshowTimer: null,
      isCredentialSlideshowPaused: false,
      isCredentialHovered: false,
      isCredentialFocused: false,
      prefersReducedMotion: false,
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
    },
    visibleCredentials() {
      return Array.from(
        { length: Math.min(this.credentialVisibleCount, this.credentials.length - this.credentialIndex) },
        (_, offset) => this.credentials[this.credentialIndex + offset]
      );
    },
    lastCredentialIndex() {
      return Math.max(0, this.credentials.length - this.credentialVisibleCount);
    }
  },
  mounted() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.updateCredentialVisibleCount();
    window.addEventListener('resize', this.updateCredentialVisibleCount);
    if (!this.prefersReducedMotion) {
      this.resetProjectSlideshow();
      this.resetCredentialSlideshow();
    }
  },
  beforeUnmount() {
    window.clearInterval(this.projectSlideshowTimer);
    window.clearInterval(this.credentialSlideshowTimer);
    window.removeEventListener('resize', this.updateCredentialVisibleCount);
  },
  methods: {
    advanceProject() {
      this.projectIndex = (this.projectIndex + 1) % this.projects.length;
    },
    resetProjectSlideshow() {
      window.clearInterval(this.projectSlideshowTimer);
      this.projectSlideshowTimer = null;
      if (!this.prefersReducedMotion && !this.isProjectHovered && !this.isProjectFocused) {
        this.projectSlideshowTimer = window.setInterval(this.advanceProject, 10000);
      }
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
    setProjectHover(isHovered) {
      this.isProjectHovered = isHovered;
      this.updateProjectSlideshow();
    },
    setProjectFocus(isFocused) {
      this.isProjectFocused = isFocused;
      this.updateProjectSlideshow();
    },
    handleProjectFocusOut(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.isProjectFocused = false;
        this.updateProjectSlideshow();
      }
    },
    updateProjectSlideshow() {
      this.resetProjectSlideshow();
    },
    resetCredentialSlideshow() {
      window.clearInterval(this.credentialSlideshowTimer);
      this.credentialSlideshowTimer = null;
      if (
        !this.prefersReducedMotion &&
        !this.isCredentialSlideshowPaused &&
        this.credentialIndex < this.lastCredentialIndex
      ) {
        this.credentialSlideshowTimer = window.setInterval(this.advanceCredential, 12000);
      }
    },
    advanceCredential() {
      if (this.credentialIndex >= this.lastCredentialIndex) {
        window.clearInterval(this.credentialSlideshowTimer);
        this.credentialSlideshowTimer = null;
        return;
      }

      this.credentialSlideDirection = 'next';
      this.credentialIndex = Math.min(
        this.credentialIndex + this.credentialVisibleCount,
        this.lastCredentialIndex
      );
      if (this.credentialIndex === this.lastCredentialIndex) {
        window.clearInterval(this.credentialSlideshowTimer);
        this.credentialSlideshowTimer = null;
      }
    },
    nextCredential() {
      this.advanceCredential();
      this.resetCredentialSlideshow();
    },
    previousCredential() {
      this.credentialSlideDirection = 'previous';
      this.credentialIndex = Math.max(0, this.credentialIndex - this.credentialVisibleCount);
      this.resetCredentialSlideshow();
    },
    setCredentialHover(isHovered) {
      this.isCredentialHovered = isHovered;
      this.updateCredentialSlideshow();
    },
    setCredentialFocus(isFocused) {
      this.isCredentialFocused = isFocused;
      this.updateCredentialSlideshow();
    },
    handleCredentialFocusOut(event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.isCredentialFocused = false;
        this.updateCredentialSlideshow();
      }
    },
    updateCredentialSlideshow() {
      this.isCredentialSlideshowPaused = this.isCredentialHovered || this.isCredentialFocused;
      if (this.isCredentialSlideshowPaused) {
        window.clearInterval(this.credentialSlideshowTimer);
        this.credentialSlideshowTimer = null;
      } else {
        this.resetCredentialSlideshow();
      }
    },
    updateCredentialVisibleCount() {
      const visibleCount = window.innerWidth <= 620 ? 1 : window.innerWidth <= 980 ? 2 : 3;
      if (visibleCount === this.credentialVisibleCount) return;

      this.credentialVisibleCount = visibleCount;
      this.credentialIndex = Math.min(this.credentialIndex, this.lastCredentialIndex);
      this.resetCredentialSlideshow();
    },
    nextCredential() {
      this.credentialIndex = this.credentialIndex >= this.lastCredentialIndex
        ? 0
        : this.credentialIndex + 1;
      this.resetCredentialSlideshow();
    },
    previousCredential() {
      this.credentialIndex = this.credentialIndex <= 0
        ? this.lastCredentialIndex
        : this.credentialIndex - 1;
      this.resetCredentialSlideshow();
    },
    openCertificate(certificate) {
      this.activeCertificate = certificate;
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
