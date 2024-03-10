(() => {
  'use strict';

  // Fetch all the forms for validation
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over each form to prevent default submission behavior and handle validation
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Prevent default form submission behavior
        event.preventDefault();
        event.stopPropagation();

        // Retrieve selected movie data
        const selectedMovie = getSelectedMovie();

        // Create the confirmation modal with selected movie data
        createConfirmationModal(selectedMovie);
      }

      // Add 'was-validated' class to indicate form has been validated
      form.classList.add('was-validated');
    }, false);
  });
})();

// Function to retrieve selected movie data
function getSelectedMovie() {
  // Add your logic here to retrieve the selected movie data
  // For example:
  // let selectedMovie = seats.SeatingData[index].seating;
  // return selectedMovie;
}

// Function to create the confirmation modal with selected movie data
function createConfirmationModal(selectedMovie) {
  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'confirmationModal';
  modal.className = 'modal';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close';
  closeBtn.innerHTML = '&times;';

  // Create confirmation message
  const confirmationMessage = document.createElement('div');
  confirmationMessage.id = 'confirmationMessage';
  confirmationMessage.className = 'confirmation-message';

  // Create checkmark image
  const checkmarkImg = document.createElement('img');
  checkmarkImg.src = './images/checkmark.jpg';
  checkmarkImg.alt = 'Checkmark';
  checkmarkImg.style.width = '150px';
  checkmarkImg.style.height = '150px';

  // Create heading
  const h2 = document.createElement('h2');
  h2.textContent = 'Order Processed!';

  // Create paragraph
  const p = document.createElement('p');
  p.textContent = 'You are now being redirected back to the homepage...';

  // Append elements to modal content
  confirmationMessage.appendChild(checkmarkImg);
  confirmationMessage.appendChild(h2);
  confirmationMessage.appendChild(p);
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(confirmationMessage);
  modal.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modal);

  // Display the modal
  modal.style.display = 'block';

  // Close the modal after 3.5 seconds
  setTimeout(() => {
    // Redirect to the homepage after 3.5 seconds
    window.location.href = 'index.html';
  }, 3500);

  // Close the modal if the user clicks the close button
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Close the modal if the user clicks anywhere outside of the modal
  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}
