1. **EMAIL**: Your Gmail address.
2. **EMAIL_PASSWORD**: App-Specific Password (see below for how to generate it).
3. **PORT**: Port for the server to listen on (default is `3000`).

### /submit Route

The `/submit` route accepts a `POST` request with the following fields:

- **name** (string): The user's full name.
- **rollNo** (string): The user's roll number.
- **email** (string): The user's email address.
- **screenshot** (file): The uploaded payment screenshot.

#### Request Format:

- **Content-Type**: `multipart/form-data`
- **Body**: JSON data for `name`, `rollNo`, and `email`, with a file for the `screenshot`.

#### Example Request:
json
{
  "name": "John Doe",
  "rollNo": "12345",
  "email": "john.doe@gmail.com",
  "file": <binary file>
}

## For Clients

### Setting Up

1. **Set Environment Variables**:
   - Add a `.env` file in the root directory of your project with the following variables:

   makefile
   EMAIL=<your_email@gmail.com>
   EMAIL_PASSWORD=<your_email_app_specific_password

>
### Generate App Password:

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
2. Sign in with your Google account.
3. Under "Select the app", choose **Mail**.
4. Under "Select the device", choose **Other (Custom)** and name it "Nodemailer".
5. Click **Generate** and copy the 16-character password provided.
6. Use this password as `EMAIL_PASSWORD` in your `.env` file.
