import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	res.status(200).send({
		message: 'Hello from ChatBox-GPT!',
	});
});

app.post('/', async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const response = await openai.createChatCompletion({
			model: 'gpt-4',
			 messages: [
                         {"role":"user", "content": prompt},
		         {"role": "system", "content": "You are a helpful assistant."},
                         ]
		});

		console.log(response.data.choices[0].message.content)
		res.status(200).send({
			bot: response.data.choices[0].message.content,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Something went wrong');
	}
});

app.listen(5000, () => console.log('server is running on http://localhost:5000'));
