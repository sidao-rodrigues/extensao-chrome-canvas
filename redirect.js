let interval, count = 0;

const redirectToVideo = () => {
  interval = setInterval(() => {
    if(count === 3) {
      alert('Por favor, tente novamente mais tarde');
      clearInterval(interval);
    }

    const source = document.querySelector('source');
    
    if(!source) {
      alert('Nenhum Vídeo encontrado');
      count++;
      return null;
    }

    clearInterval(interval);
    window.location.href = source.src;
    return true;
  }, 3000);
}

const showTootip = () => {
  const div = document.createElement('div');
  div.style.cssText = 'min-width: 250px; background-color: #333; color: #fff; text-align: center; border-radius: 8px; padding: 16px; position: fixed; z-index: 1; left: 33%; right: 33%; top: 30px; margin: auto;';
  div.innerHTML = 'Você será redirecionado. Por favor, aguarde! 😁';
  document.body.prepend(div);
}

window.onload = () => {
  showTootip();
  redirectToVideo();
}