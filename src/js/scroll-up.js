// When the user scrolls down 20px from the top of the document, show the button
const upBtn = document.querySelector('#up-button');

window.onscroll = onscroll;
function onscroll() {
  scrollFunction();
}

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 20) {
    upBtn.style.display = 'flex';
    upBtn.style.opacity = '1';
  } else {
    upBtn.style.display = 'none';
    upBtn.style.opacity = '0';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
upBtn.onclick = topFunction;
