import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { io } from "../index.js";
import { gemini } from "../config/gemini-config.js";
import { groq } from "../config/groq-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
        // grab chats of user
        const chats = user.chats.map((chat) => ({
            role: chat.role,
            content: chat.content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        io.emit("ai-typing");
        // send all chats with new one to openAI API
        let reply = null;
        // Groq
        try {
            const response = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: chats,
            });
            reply = response.choices[0].message.content;
            console.log("Using Groq");
        }
        catch (err) {
            console.log("Groq failed");
        }
        if (!reply) {
            // Gemini
            try {
                const response = await gemini.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: message,
                });
                reply = response.text;
                console.log("Using Gemini");
            }
            catch (err) {
                console.log("Gemini failed");
            }
        }
        // OpenRouter
        if (!reply) {
            const openai = configureOpenAI();
            const models = [
                "cohere/north-mini-code:free",
                "openai/gpt-oss-20b:free",
                "deepseek/deepseek-r1-0528:free",
                "google/gemma-4-26b-a4b-it:free",
            ];
            for (const model of models) {
                try {
                    const response = await openai.chat.completions.create({
                        model,
                        messages: chats,
                    });
                    reply = response.choices[0].message.content;
                    console.log(`Using ${model}`);
                    break;
                }
                catch (err) {
                    console.log(`${model} failed`);
                }
            }
        }
        // Final check
        if (!reply) {
            return res.status(429).json({
                success: false,
                message: "Daily AI limit reached!!😔 Please try again tomorrow",
            });
        }
        user.chats.push({
            role: "assistant",
            content: reply,
        });
        io.emit("ai-stop-typing");
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log("openai error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore --to ignore the type error
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map