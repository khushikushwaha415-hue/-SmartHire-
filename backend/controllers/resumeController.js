const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async(req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const pdfBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(pdfBuffer);
        const resumeText = pdfData.text;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
    Analyze this resume and provide:
    1. Overall score out of 100
    2. Top 5 skills found
    3. 3 strengths
    4. 3 areas of improvement
    5. Short summary (2-3 lines)

    Resume:
    ${resumeText}

    Respond in this exact JSON format:
    {
      "score": 85,
      "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "strengths": ["strength1", "strength2", "strength3"],
      "improvements": ["improvement1", "improvement2", "improvement3"],
      "summary": "Brief summary here"
    }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return res.status(500).json({ message: 'AI response error' });

        const analysis = JSON.parse(jsonMatch[0]);

        fs.unlinkSync(req.file.path);

        res.json(analysis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};