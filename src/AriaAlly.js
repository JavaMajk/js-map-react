//Function to run for setting a title for iframe to comply with a11y reqirements
export const labelIframe = () => {
  setTimeout(() => {
    const frame = document.querySelector('iframe');
    //Added test to see if map frame loaded correctly as requested if not then display image.
    if (frame) {
      frame.setAttribute('title', 'Mapka');
    } else if (!frame) {
      document.querySelector('.map').innerHTML = '<h1> SOMETHING WENT WRONG.. </h1><h3>The maps could not load correctly. Check API Key and/or your connection.</h3>';
    }
  }, 1300);
}