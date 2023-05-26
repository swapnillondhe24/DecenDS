from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)

# Configure Flask-Mail settings
app.config['MAIL_SERVER'] = 'smtp.titan.email'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'noreply@decends.live'
app.config['MAIL_PASSWORD'] = '!DecenDS@2023'

mail = Mail(app)


def send_email():
    recipient = "yashdeshmukh40@gmail.com"
    subject = "hi yash this is a test email"
    message_body = "this is a test email. to test the email functionality of the backend. using noreply@decends.live"

    # Create the email message
    message = Message(subject=subject, recipients=[recipient])
    message.body = message_body

    try:
        # Send the email
        mail.send(message)
        return 'Email sent successfully'
    except Exception as e:
        return str(e)
    


