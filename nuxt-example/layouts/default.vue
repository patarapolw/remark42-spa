<template>
  <section>
    <nav>
      <ul>
        <li :class="{ active: $route.path === '/' }">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li :class="{ active: $route.path === '/another' }">
          <nuxt-link to="/another">Another</nuxt-link>
        </li>
      </ul>
    </nav>

    <main>
      <nuxt />

      <article>
        <h2>Comments</h2>
        <div ref="remark42" />
      </article>
    </main>
  </section>
</template>

<script>
import 'marx-css/css/marx.css'
import '~/assets/app.css'

export default {
  watch: {
    '$route.path'() {
      this.initRemark42()
    },
  },
  mounted() {
    if (window.REMARK42) {
      this.initRemark42()
    } else {
      window.addEventListener('REMARK42::ready', () => {
        this.initRemark42()
      })
    }
  },
  methods: {
    initRemark42() {
      if (window.REMARK42) {
        if (window.REMARK42.destroy) {
          window.REMARK42.destroy()
        }

        window.REMARK42.createInstance({
          node: this.$refs.remark42,
          site_id: process.env.REMARK42_SITE_ID,
        })
      }
    },
  },
  beforeRouteLeave() {
    if (process.client) {
      if (window.REMARK42 && window.REMARK42.destroy) {
        window.REMARK42.destroy()
      }
    }
  },
}
</script>

<style scoped>
nav {
  box-shadow: 0 1px 2px rgba(99, 114, 130, 0.06),
    0 3px 6px rgba(27, 39, 51, 0.08);
}

nav > ul {
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
}

nav > ul > li {
  margin-left: 1rem;
}
</style>
