setTimeout(() => {
  fetch('http://localhost:3000/api/dump', {
    method: 'POST',
    body: document.body.innerHTML
  }).catch(e => console.error(e));
}, 3000);
