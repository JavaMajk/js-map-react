//Function to run for setting a title for iframe to comply with a11y reqirements
export const labelIframe = () => {
  setTimeout(() => {
    const frame = document.querySelector('iframe');
    frame.setAttribute('title', 'Mapka');}
    , 900);
}