import axios from "axios";
const generate = async (req, res) => {
    console.log("generatehit");

    const { prompt } = req.body


    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt must be a non-empty string." });
    }

    try {
        const aires = await axios.post("https://api.groq.com/openai/v1/chat/completions",
            {

                "model": "llama-3.3-70b-versatile",
                "messages": [{
                    "role": "user",
                    "content": prompt
                }]
            },
            {
                "headers": {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                }
            }
        )

        const response = aires.data.choices[0].message.content
        res.status(200).json({ content: response })




    } catch (error) {
        console.log(error.response?.data || error.message);

        res.status(500).json({ error: 'AI generation failed' });


    }







}



export { generate }