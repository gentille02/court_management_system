<template>
  <div style="background: var(--bg-base); color: var(--text-1); min-height: 100vh;">

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-8 py-4" style="background: var(--bg-panel); border-bottom: 1px solid var(--border);">
      <div class="flex items-center gap-3">
        <span class="text-3xl">⚖️</span>
        <span class="text-xl font-bold" style="font-family: 'Syne', sans-serif;">Court Management System</span>
      </div>
      <router-link to="/login"
        class="px-5 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
        style="background: var(--accent-client); color: #0d0f14;">
        Login
      </router-link>
    </nav>

    <!-- Hero -->
    <section class="flex flex-col items-center justify-center text-center px-6 py-24">
      <div class="text-7xl mb-6">⚖️</div>
      <h1 class="text-5xl font-bold mb-4" style="font-family: 'Syne', sans-serif; line-height: 1.15;">
        Your Court. <span style="color: var(--accent-client);">Simplified.</span>
      </h1>
      <p class="text-lg max-w-xl mb-10" style="color: var(--text-2);">
        A modern digital portal for booking court appointments, submitting case documents, and tracking your case status — all in one place.
      </p>
      <router-link to="/login"
        class="px-8 py-3 rounded-lg font-bold text-lg transition-opacity hover:opacity-80"
        style="background: var(--accent-client); color: #0d0f14;">
        Get Started →
      </router-link>
    </section>

    <!-- Services -->
    <section class="px-8 py-16" style="background: var(--bg-panel);">
      <h2 class="text-3xl font-bold text-center mb-2" style="font-family: 'Syne', sans-serif;">Our Services</h2>
      <p class="text-center mb-10" style="color: var(--text-2);">Everything you need to interact with the court — online and hassle-free.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div v-for="service in services" :key="service.title"
          class="p-5 rounded-xl"
          style="background: var(--bg-card); border: 1px solid var(--border);">
          <div class="text-3xl mb-3">{{ service.icon }}</div>
          <h3 class="font-semibold mb-1" style="color: var(--text-1);">{{ service.title }}</h3>
          <p class="text-sm" style="color: var(--text-3);">{{ service.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Why CMS -->
    <section class="px-8 py-16">
      <h2 class="text-3xl font-bold text-center mb-2" style="font-family: 'Syne', sans-serif;">Why Use CMS?</h2>
      <p class="text-center mb-10" style="color: var(--text-2);">Built to make court processes faster, transparent, and accessible to everyone.</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div v-for="benefit in benefits" :key="benefit.title" class="text-center p-6 rounded-xl"
          style="background: var(--bg-card); border: 1px solid var(--border);">
          <div class="text-4xl mb-3">{{ benefit.icon }}</div>
          <h3 class="font-semibold mb-2" style="color: var(--text-1);">{{ benefit.title }}</h3>
          <p class="text-sm" style="color: var(--text-3);">{{ benefit.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center px-6 py-20" style="background: var(--bg-panel); border-top: 1px solid var(--border);">
      <h2 class="text-3xl font-bold mb-4" style="font-family: 'Syne', sans-serif;">Ready to get started?</h2>
      <p class="mb-8" style="color: var(--text-2);">Create an account or log in to access court services online.</p>
      <div class="flex justify-center gap-4">
        <router-link to="/register"
          class="px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80"
          style="background: var(--bg-hover); color: var(--text-1); border: 1px solid var(--border);">
          Create Account
        </router-link>
        <router-link to="/login"
          class="px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-80"
          style="background: var(--accent-client); color: #0d0f14;">
          Login
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 text-sm" style="color: var(--text-3); border-top: 1px solid var(--border);">
      © {{ new Date().getFullYear() }} Court Management System. All rights reserved.
    </footer>

  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      services: [
        { icon: '🏛️', title: 'Case Filing', desc: 'File civil or criminal cases online without visiting the court.' },
        { icon: '📄', title: 'Document Submission', desc: 'Submit and certify your legal documents securely.' },
        { icon: '⚖️', title: 'Mediation & Dispute Resolution', desc: 'Request mediation sessions for faster dispute resolution.' },
        { icon: '📅', title: 'Hearing Booking', desc: 'Book your hearing appointment at a convenient date.' },
        { icon: '🔍', title: 'Case Status Inquiry', desc: 'Track the progress of your case in real time.' },
        { icon: '📜', title: 'Court Order Requests', desc: 'Request official court orders and certificates online.' },
        { icon: '👤', title: 'Legal Aid Application', desc: 'Apply for legal aid and get the support you need.' },
        { icon: '📬', title: 'General Inquiries', desc: 'Submit any other court-related requests easily.' }
      ],
      benefits: [
        { icon: '⚡', title: 'Fast & Efficient', desc: 'Book appointments and submit documents in minutes, not days.' },
        { icon: '🔒', title: 'Secure & Private', desc: 'Your data and documents are protected with industry-standard security.' },
        { icon: '📱', title: 'Accessible Anywhere', desc: 'Access court services from any device, anytime, anywhere.' }
      ]
    }
  }
}
</script>
