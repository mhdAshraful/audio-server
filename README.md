# audio-server

 <!-- "start": "node index.js" -->

❌ The issue:
Doing both:

Setting CORS headers manually:
app.use("/", (req, res, next) => {
res.header("Access-Control-Allow-Origin", "\*");
...
});
Using the cors package with specific origin:
app.use(cors({ origin: [...], ... }));
This is conflicting behavior:

Access-Control-Allow-Origin: \* (from your manual middleware) allows any origin,
But then cors() says only allow certain origins.
👉 Browsers may get confused or ignore it altogether, especially with credentials.

✅ Cleaned-up version (recommended):
Just use the cors() middleware properly and remove the manual headers:

const cors = require("cors");

app.use(
cors({
origin: [
"https://audiophile-green-alpha.vercel.app",
"http://localhost:3000",
],
methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
credentials: true, // only include if you're sending cookies or auth headers
})
);
🔥 That’s it. No need for the res.header() part.
