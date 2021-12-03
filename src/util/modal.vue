<template>
  <div>
    

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Review Detail"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      body-bg-variant="secondary"
      header-bg-variant="secondary"
      footer-bg-variant="secondary"
      centered 
      size="lg"
    >
    <hr>
    <h4>content</h4>
    <h6>{{review.content}}</h6>
    <hr>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Comments"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
        <div class="mt-3">
          <div v-if="submittedNames.length === 0">--</div>
          <ul v-else class="mb-0 pl-3">
            <li v-for="name in submittedNames" :key="name">{{ name }}</li>
          </ul>
        </div>
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  props: {
    review: Object
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)
      this.name = ''
      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide('modal-prevent-closing')
      // })
    }
  },
  created: function () {
    console.log(this.review);
  }
}
</script>