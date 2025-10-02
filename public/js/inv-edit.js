const form = document.querySelector("#editForm")
    form.addEventListener("change", function () {
      const editBtn = document.querySelector("button[type='submit']")
      editBtn.removeAttribute("disabled")
    })