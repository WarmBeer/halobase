<template>
  <v-container fluid :class="$vuetify.breakpoint.mdAndUp ? 'px-8' : 'px-4'">
    <v-row>
      <v-col
          cols="12"
      >
        <v-sheet
            dark
            color="primary"
            class="px-8 pb-6 overflow-hidden rounded-lg text-left"
        >
          <div
              class="py-6 text-h4 white--text font-weight-bold text-center"
          >
            Terms of Service
          </div>
          <h2>HaloBase.net Terms and Conditions of Use</h2>
          <p>
            Please read these terms of service (‘terms’) carefully before accessing halobase.net
            (‘website’) operated by HaloBase (‘us’, ‘we’, ‘our’).
          </p>
          <h3>1. Terms</h3>
          <p>
            By accessing this Website, accessible from halobase.net, you are agreeing to be bound
            by these terms and agree that you are responsible for the agreement with any applicable
            local laws. If  you disagree with any of these terms, you are prohibited from accessing
            this site. The materials contained in this Website are protected by copyright and
            trademark law.
          </p>

          <h3>2. Disclaimer</h3>
          <p>
            All content on our website is provided “as is”. We make no warranties, may it be
            expressed or implied, therefore negate all other warranties. Furthermore, we do not
            make any representations concerning the accuracy or reliability of the use of the
            materials on our Website or otherwise relating to such materials or any sites linked
            to this Website.
          </p>

          <h3>3. Limitations</h3>
          <p>
            We will not be held liable for any damages that will arise with the use or inability
            to use the materials on our website, even if we have been notified, orally or written,
            of the possibility of such damage. Some jurisdictions do not allow limitations on
            implied warranties or limitations  of liability for incidental damages, these
            limitations may not apply to you.
          </p>

          <h3>4. Revisions and Errata</h3>
          <p>
            The materials appearing on our website may include technical, typographical,
            or photographic errors. We will not promise that any of the materials in this
            Website are accurate, complete, or current. We may change the materials
            contained on its Website at any time without notice. We
            do not make any commitment to update the content.
          </p>

          <h3>5. Links</h3>
          <p>
            We have not reviewed all of the sites linked to its Website and is not
            responsible for the contents of any such linked site. The presence of any
            link does not imply endorsement by us of the site.
            The use of any linked website is at the user's own risk.
          </p>

          <h3>6. License and Site Access</h3>
          <p>
            We grant you a limited license to access and make personal use of this website. You are not
            allowed to download or modify it. This may be done only with written consent from us.
          </p>

          <h3>7. Site Terms of Use Modifications</h3>
          <p>
            We may revise these Terms of Use for its Website at any time without prior notice. By using
            this Website, you are agreeing to be bound by the current version of these Terms and
            Conditions of Use.
          </p>

          <h3>8. Governing Law</h3>
          <p>
            Any claim related to halobase.net shall be governed by the laws of the Kingdom of the
            Netherlands without regards to its conflict of law provisions.
          </p>

          <h3>9. Disputes</h3>
          <p>
            Any dispute related in any way to your use of our website shall be arbitrated by the Courts of
            the Kingdom of the Netherlands and you consent to exclusive jurisdiction and venue of such
            courts.
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "Terms"
}
</script>

<style scoped>

</style>