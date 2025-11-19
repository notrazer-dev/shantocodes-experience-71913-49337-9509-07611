# EmailJS Setup Guide for Contact Form

To enable the email sending functionality for the contact form, you need to set up an EmailJS account and configure it with your email service and a template.

Follow these steps:

1.  **Create an EmailJS Account:**
    *   Go to [https://www.emailjs.com](https://www.emailjs.com) and create a free account.

2.  **Add a New Service:**
    *   In your EmailJS dashboard, navigate to "Email Services" and click "Add New Service".
    *   Choose your preferred email provider (e.g., Gmail) and connect your account.
    *   After creating the service, you will be provided with a **Service ID**. Make sure to note this down.

3.  **Create an Email Template:**
    *   Go to "Email Templates" and click "Create New Template".
    *   Design your email template. EmailJS uses double curly braces `{{variable_name}}` for dynamic variables that will be populated from your contact form. Ensure your template includes the following variables to receive the user's name, email, and message:
        *   `{{user_name}}`: for the sender's name.
        *   `{{user_email}}`: for the sender's email address.
        *   `{{message}}`: for the message content.
    *   After creating and saving the template, you will be provided with a **Template ID**. Note this down.

4.  **Get your Public Key:**
    *   Go to the "Account" section in your EmailJS dashboard.
    *   You will find your **Public Key** there. Note this down.

5.  **Update the `.env` file:**
    *   Open the `.env` file located in the root directory of your project.
    *   Replace the placeholder values with your actual EmailJS credentials that you noted down in the previous steps:

    ```
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
    *   **Important:** If your development server is currently running, you will need to restart it after modifying the `.env` file for the changes to take effect.

Once you have completed these steps, the contact form will be fully functional and able to send emails to your configured email address via EmailJS.
