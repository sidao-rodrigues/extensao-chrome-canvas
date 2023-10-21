const saveTitleStorage = async () => {
  const titleVideo = document.getElementsByClassName('page-title');
  return await chrome.storage.local.set({ title: (titleVideo.length > 0 ? titleVideo[0].textContent : null) });
}

window.onload = () => {
  setTimeout(async () => {
    await saveTitleStorage();
  }, 300);
}