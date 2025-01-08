document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value.trim()
    const email = document.querySelector('#email').value.trim()
    const description = document.querySelector('#description').value.trim()    
    const interesesElements = document.querySelectorAll('#interes:checked')
    let intereses = []
    interesesElements.forEach(interes => intereses.push(interes.name))

    let isValid = true
    console.log(name, email, description, intereses)

    if (name === '') {
      sendError('Necesitamos que pongas tu nombre')
      isValid = false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email === '' || !emailPattern.test(email)) {
      sendError('Necesitamos que pongas un email válido')
      isValid = false
    }

    if (description === '') {
      sendError('Por favor, describinos tu problema, así podemos ayudarte mejor')
      isValid = false
    }

    if (isValid) {

      const emailParams = {
        name,
        email,
        subject: `Recibiste un mensaje de ${name} desde la landing de Kiwi ConsultorIA`,
        message: `${description} \n Intereses: ${intereses}`
      }
  
      await sendEmail(emailParams)
    }
})


function sendError(message) {
  Swal.fire({
      title: `¡Error!`,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      color: '#fff',
      background: '#333',
  })
}

async function sendEmail(emailParams) {
  await emailjs.send('service_8tnpwje', 'template_32feuh2', emailParams)

  await Swal.fire({
      title: `¡Gracias ${name}!`,
      text: `Te estaremos contactando en breve`,
      icon: 'success',
      confirmButtonText: 'Cerrar',
      color: '#fff',
      background: '#333',
  })  
}