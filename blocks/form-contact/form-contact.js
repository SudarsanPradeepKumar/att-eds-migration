export default function decorate(block) {
  // Convert content rows into form fields
  const form = document.createElement('form');
  form.className = 'contact-form';

  const rows = [...block.children];
  rows.forEach((row) => {
    const labelText = row.textContent.trim();
    if (!labelText) return;

    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    const label = document.createElement('label');
    const fieldId = labelText.toLowerCase().replace(/\s+/g, '-');
    label.setAttribute('for', fieldId);
    label.textContent = labelText;

    let input;
    if (labelText.toLowerCase().includes('comment') || labelText.toLowerCase().includes('message')) {
      input = document.createElement('textarea');
      input.rows = 4;
    } else if (labelText.toLowerCase().includes('email')) {
      input = document.createElement('input');
      input.type = 'email';
    } else if (labelText.toLowerCase().includes('phone')) {
      input = document.createElement('input');
      input.type = 'tel';
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }

    input.id = fieldId;
    input.name = fieldId;
    input.placeholder = labelText;
    input.required = true;

    fieldWrapper.append(label, input);
    form.append(fieldWrapper);
  });

  // Add submit button
  const submitWrapper = document.createElement('div');
  submitWrapper.className = 'form-submit';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'button primary';
  submitBtn.textContent = 'Submit';
  submitWrapper.append(submitBtn);
  form.append(submitWrapper);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Placeholder - in production, this would submit to a backend
    // eslint-disable-next-line no-alert
    alert('Thank you for your inquiry. A sales representative will contact you shortly.');
    form.reset();
  });

  block.textContent = '';
  block.append(form);
}
