const mixin = {
  directives: {
    bcg: {
      bind: (element, binding) => {
        element.style.backgroundColor = binding.value.bg
        element.style.color = binding.value.color
      }
    }
  }
}

export default mixin
