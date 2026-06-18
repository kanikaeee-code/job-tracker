app.use(cors({
origin: [
'http://localhost:5173',
'https://job-tracker-mu-pied.vercel.app/' // Replace with your Vercel URL
],
credentials: true,
}));