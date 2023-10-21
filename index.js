
let loadButton, spanDescription;//, copyTitle;

const getCurrentTab = () => {
  return chrome.tabs.query({ active: true, currentWindow: true });
}

const executingScript = async (tab, fn) => {
  return await chrome.scripting.executeScript({ 
    target: { tabId: tab.id },
    func: fn
  });
}

const getDataIframe = async () => {
  const iframe = document.querySelector('iframe[allowfullscreen]');
  
  if(!iframe) {
    alert('Nenhum Vídeo encontrado');
    return null;
  }

  const titleVideo = document.getElementsByClassName('page-title');

  return { url: iframe.src, title: titleVideo.length > 0 ? titleVideo[0].textContent : null };
}

const saveItemStorage = async (value) => {
  return chrome.storage.local.set({ title: value });
}

const getItemStorage = () => {
  return chrome.storage.local
    .get(['title'])
    .then((result) => result.title || null);
}

const updateDescription = (title) => {
  spanDescription.innerHTML = title;
}

window.addEventListener('load', async () => {
  const title = await getItemStorage();
  updateDescription(title);
});

window.onload = () => {
  loadButton = document.getElementById('load');
  spanDescription = document.getElementById('description');

  loadButton.addEventListener('click', async () => {
    const [tab] = await getCurrentTab();
    const [data] = await executingScript(tab, getDataIframe);

    if(data.result) {
      const { url, title } = data.result;

      updateDescription(title);

      if(!url) {
        return alert('Nenhuma url encontrada');
      }

      await saveItemStorage(title);
      return window.open(data.result.url, '_blank');
    }
  }); 
}
