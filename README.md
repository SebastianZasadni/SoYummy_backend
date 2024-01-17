<h1>SoYummy API.</h1>

<p>The So Yummy API allows users to register and log in, as well as perform various operations related to recipes.</p>
<p>It was made for managment database in MongoDB.</p>
<p>Dependencies use in project: </p>
<ul>
  <li>bcrypt</li>
  <li>cloudinary</li>
  <li>cors</li>
  <li>dotenv</li>
  <li>express</li>
  <li>joi</li>
  <li>jsonwebtoken</li>
  <li>mongoose</li>
  <li>morgan</li>
  <li>multer</li>
  <li>nodemailer</li>
  <li>swagger</li>
</ul>

<p>To run this project you need to: </p>
<ul>
  <li>Create cluster in mongodb like the models in API</li>
  <li>Create account on brevo. It allows you to send newsletter email to user</li>
  <li>Create account on cloudinary</li>
</ul>
<p>Then you have to create .env file and add the following values: </p>
<ul>
<li>DATABASE_URL = "URI your database"</li>
<li>SECRET = "Your secret key to jsonwebtoken"</li>
<li>EMAIL_USER = "Brevo email"</li>
<li>EMAIL_PASS = "Brevo pass"</li>
<li>EMAIL_HOST = "Brevo host"</li>
<li>EMAIL_PORT = "Brevo port"</li>
<li>CLOUD_NAME = "Cludinary name"</li>
<li>API_KEY = "Cludinary API key"</li>
<li>API_SECRET = "Cloudinary API secret</li>
</ul>
<p>Then you run npm start, then npm run dev and your API's working</p>
