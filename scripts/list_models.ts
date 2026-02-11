
import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

// Load env
const envPath = path.resolve(process.cwd(), '.env');
let apiKey = '';
try {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const envConfig = envFile.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {} as Record<string, string>);
    apiKey = envConfig.GEMINI_API_KEY;
} catch (e) {
    console.error("Could not read .env file");
}

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

async function listModels() {
    const ai = new GoogleGenAI({ apiKey });
    try {
        console.log("Fetching models...");
        const response: any = await ai.models.list();

        console.log("--- AVAILABLE GEMINI MODELS ---");
        for await (const model of response) {
            // Check supportedActions OR supportedGenerationMethods
            const actions = model.supportedActions || model.supportedGenerationMethods || [];

            if (model.name.toLowerCase().includes('gemini') &&
                actions.includes('generateContent')) {
                console.log(model.name);
            }
        }
        console.log("-------------------------------");

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
