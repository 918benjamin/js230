document.addEventListener("DOMContentLoaded", () => {
  let main = document.querySelector('main');
  main.addEventListener("contextmenu", event => {
    event.stopPropagation()
    event.preventDefault()
    alert(event.target.nodeName)
  })
})