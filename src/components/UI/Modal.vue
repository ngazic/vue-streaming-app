<template>
<!-- Modal -->
<div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancel">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      This is demo payment option. Clicking "Understood" will simulate payment service, and you will proceed with watching desired video
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancel">
        Close
      </button>
      <button type="button" class="btn btn-primary" @click="agreed">Understood</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  methods: {
    agreed(): void {
      this.$emit('handlePayment', true)
    },
    cancel(): void {
      this.$emit('handlePayment', false)
    }
  }
};
</script>
