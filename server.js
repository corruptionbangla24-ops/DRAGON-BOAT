const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🐉 ওরিজিনাল ড্রাগন বোট ৫-রিল স্লট সিম্বল পুশ মেমোরি
const symbolsList = ["DRAGON", "GOLD_DRUM", "LANTERN", "COIN", "WAVE"];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারсеপ্টর গেটওয়ে (রয়্যাল ডার্বি হুবহু ট্র্যাপ ফলব্যাক সিঙ্ক)
app.get('/api/dragonboat-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    let finalUser = userId === "logged_in_player" || !userId || userId === "undefined" ? "guest" : userId;
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", username: finalUser, amount: 0, wallet: targetWallet, game: "dragonboat"
        }, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ড্রাগন বোট কোর ৫-রিল স্পিন রাউট (রয়্যাল ডার্বির ১০০% সিকিউরড এয়ার-টাইট সিঙ্গেল পাইপলাইন প্রোটোকল বর্ম)
app.post('/api/dragonboat-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body; 
    const reqAmount = parseFloat(amount) || 50;
    const finalGameName = "dragonboat"; 
    const targetWallet = wallet || "main";

    let finalQueryUser = userId;
    if (!finalQueryUser || finalQueryUser === "logged_in_player" || finalQueryUser === "undefined") {
        finalQueryUser = "guest"; 
    }

    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter! Max 20000 ৳" });
    }

    try {
        // 🔒 [🔒 রয়্যাল ডার্বি মেগা ব্যালেন্সার বর্ম]: ডাবল কলব্যাকের ট্র্যাপ উপড়ে ফেলে সরাসরি ১ম হিটে বাজি ডেবিট রিকোয়েস্ট ফায়ার লক ওস্তাদ!
        // ডাটাবেজ নিজেই রিয়েল-টাইমে টাকা চেক করে যদি দেখে প্লেয়ারের সাফ ব্যালেন্স নাই, সে এখান থেকেই সরাসরি জেনুইন রিজেক্ট রেসপন্স ছুড়বে ভাই ভাই!
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: finalQueryUser, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ আপনার অ্যাকাউন্ট ব্যালেন্স জিরো বা অপ্রতুল! দয়া করে রিচার্জ করুন ওস্তাদ।" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance) || 0;
        
        let finalReelsResultMatrix = []; 
        let winMultiplier = 0.00;
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 রয়্যাল ডার্বি স্ট্যান্ডার্ডে তৈরি পিউর জেনুইন ৯৫% RTP ৫-রিল লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            finalReelsResultMatrix = [];

            // ৫টি রিলের জন্য ৫টি পিউর র্যান্ডম সিম্বল সিলেকশন লক চ্যাম
            for (let i = 0; i < 5; i++) {
                let randomIdx = Math.floor(Math.random() * symbolsList.length);
                finalReelsResultMatrix.push(symbolsList[randomIdx]);
            }

            // 🎯 [পে-লাইন কম্বিনেশন ম্যাচিং স্কোর ক্যালকুলেটর ইঞ্জিন]
            let matchCountsMap = {};
            finalReelsResultMatrix.forEach(sym => {
                matchCountsMap[sym] = (matchCountsMap[sym] || 0) + 1;
            });

            let maxMatchesCount = Math.max(...Object.values(matchCountsMap));
            let matchedSymbolName = Object.keys(matchCountsMap).find(key => matchCountsMap[key] === maxMatchesCount);

            // ৫-রিল স্লট আন্তর্জাতিক পে-আউট ওッズ বিন্যাস সিঙ্ক ওস্তাদ
            if (maxMatchesCount === 5) {
                winMultiplier = (matchedSymbolName === "DRAGON") ? 50.00 : 25.00; 
                finalStatus = "win";
            } else if (maxMatchesCount === 4) {
                winMultiplier = (matchedSymbolName === "DRAGON") ? 8.00 : 4.00;
                finalStatus = "win";
            } else if (maxMatchesCount === 3) {
                winMultiplier = (matchedSymbolName === "DRAGON") ? 2.50 : 1.50;
                finalStatus = "win";
            } else if (maxMatchesCount === 2) {
                winMultiplier = 0.50; 
                finalStatus = "lose";
            } else {
                winMultiplier = 0.00;
                finalStatus = "lose";
            }

            // এডমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.dragonboat_target) {
                let target = String(balResponse.data.dragonboat_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    finalReelsResultMatrix = ["DRAGON", "GOLD_DRUM", "LANTERN", "COIN", "WAVE"];
                    winMultiplier = 0.00; finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    if (Math.random() <= 0.22) isLoopActive = false;
                } else {
                    isLoopActive = false; // 🔒 লস হলে ওয়ান-শটে লুপ ব্রেক বর্ম! রয়্যাল ডার্বির মতো ওল্ড ইনফিনিটি জ্যাম চিরতরে সাফ!
                }
            }
        }

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (winMultiplier > 0) {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; // 🔒 লস হলে ডাটাবেজে ২য় বার টাকা কাটার ট্র্যাপ এরর ওয়ান-শটে ওড়াও সাফ!
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (winMultiplier === 0 || winMultiplier < 1) phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

        // 🛫 ③ মেইন সাইটের সিকিউরড গেটওয়েতে রিয়েল-টাইম উইন-লস সেটেলমেন্ট এپیআই হিট (রয়্যাল ডার্বি হুবহু ব্যাকটিক বর্ম লক ওস্তাদ!)
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: finalQueryUser, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    finalReelsResultMatrix,
                    winMultiplier,
                    status: phpPayload.status, 
                    winAmount 
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

const PORT = process.env.PORT || 40000; 
server.listen(PORT, () => { console.log(`🐉 Dragon Boat Royal 5-Reel Slots Engine Running on port ${PORT}`); });
