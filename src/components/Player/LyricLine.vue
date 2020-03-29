<script>
export default {
  functional: true,

  props: {
    content: { type: String, default: '' },
    active: { type: Boolean, default: false }
  },

  render (h, { props }) {
    return (
      <p class={props.active ? 'active' : ''}>{ props.content }</p>
    )
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0 10px;
  line-height: 25px;
  text-align: center;
  color: #ccc;

  &.active {
    color: #fff;
    font-weight: bold;
  }
}
</style>