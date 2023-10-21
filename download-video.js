const pauseVideo = () => {
  setTimeout(() => {
    const video = document.querySelector('video');
    video.pause();
  }, 200);
}

const getItemStorage = () => {
  return chrome.storage.local.get(['title'])
    .then((result) => result.title || null);
}

const getNameVideo = async () => {
  // let name = window.prompt('Informe o nome do vídeo:\nVocê pode copiar o título da aula indo na extensão(Por padrão o título da aula já foi colocado)!', title) || '';
  const title = await getItemStorage();
  const source = document.querySelector('source');
  
  let name = title + '.' + source.type.split('/')[1];

  name = name.replace(/(:|\/|\\|\*|\?|\<|\>)/g, '')?.trim();
  
  if(!name) {
    const href = window.location.href;

    let urlName = href.substring(href.indexOf('transcodings/') + 13, href.indexOf('?&Expires'));
    
    if(!urlName.includes(source.type.split('/')[1])) {
      urlName = Math.random().toString().replace('.', '') + '.' + source.type.split('/')[1];
    }
    return urlName;
  }
  return name;
}

const downloadResource = () => {
  pauseVideo();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', window.location.href, true);

  xhr.responseType = 'blob';

  xhr.onload = async function() {
    const urlCreator = window.URL || window.webkitURL;
    
    const videoUrl = urlCreator.createObjectURL(this.response);
    const tag = document.createElement('a');
    
    tag.href = videoUrl;
    tag.target = '_blank';
    tag.download = await getNameVideo();

    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
    
    setTimeout(() => {
      window.close();
    }, 300);
  }

  xhr.onerror = (err) => {
    console.log('ERR:', err);
    alert('Ocorreu um erro ao baixar Vídeo! 😭'); 
  }

  xhr.send();
}

window.onload = async () => {
  setTimeout(() => {
    downloadResource();
  }, 300);
}