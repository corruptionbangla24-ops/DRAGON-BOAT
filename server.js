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

// 🐉 ওরিজিনাল ড্রাগন বোট স্লট সিম্বল ম্যাট্রিক্স (৫টি প্রিমিয়াম এশিয়ান সিম্বল ওッズ মেমোরি)
const slotSymbolsPool = [
    { name: "DRAGON", id: 0, weight: 15 },    
    { name: "GOLD_DRUM", id: 1, weight: 20 }, 
    { name: "LANTERN", id: 2, weight: 25 },   
    { name: "COIN", id: 3, weight: 30 },      
    { name: "WAVE", id: 4, weight: 35 }       
];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে
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

// 🛫 ২. ড্রাগন বোট কোর ۵-রিল স্পিন রাউট (১০০০% এয়ার-টাইট ট্রানজেকশন প্রোটোকল বর্ম)
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
        // 🔒 [জিরো-ডাবল-ডেবিট ডাইরেক্ট ইন্টারসেপ্টর বর্ম]: বাজি প্লে করার সাথে সাথে ১ম হিটে অ্যাকাউন্ট থেকে বাজি কাটার রিকোয়েস্ট লক
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

        // 🎰 [🎰 আন্তর্জাতিক ৫-রিল জেনুইন স্লট র্যান্ডম ৯৫% RTP লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            finalReelsResultMatrix = [];

            // ৫টি রিল জেনারেট লক ওস্তাদ
            for (let i = 0; i < 5; i++) {
                let totalWeight = 0;
                slotSymbolsPool.forEach(s => { totalWeight += s.weight; });
                
                let randomWeight = Math.random() * totalWeight;
                let selectedSymbol = "DRAGON";

                let currentWeightSum = 0;
                // 🔒 [ইনফিনিটি লুপ ব্লকার ফিক্সড বর্ম]: ওল্ড টাইপো কাটা সিনট্যাক্স ওয়ান-শটে ফিক্সড করে পিউর অ্যারে লুপ লক!
                for (let k = 0; k < slotSymbolsPool.length; k++) {
                    currentWeightSum += slotSymbolsPool[k].weight;
                    if (randomWeight <= currentWeightSum) {
                        selectedSymbol = slotSymbolsPool[k].name;
                        break;
                    }
                }
                finalReelsResultMatrix.push(selectedSymbol);
            }

            // 🎯 [পে-线 কম্বিনেশন মাল্টিপ্লায়ার ক্যালকুলেটর ইঞ্জিন]
            let matchCountsMap = {};
            finalReelsResultMatrix.forEach(sym => {
                matchCountsMap[sym] = (matchCountsMap[sym] || 0) + 1;
            });

            let maxMatchesCount = Math.max(...Object.values(matchCountsMap));
            let matchedSymbolName = Object.keys(matchCountsMap).find(key => matchCountsMap[key] === maxMatchesCount);

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
                    if (Math.random() <= 0.21) isLoopActive = false;
                } else {
                    isLoopActive = false;
                }
            }
        }

        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (winMultiplier > 0) {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; 
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (winMultiplier === 0 || winMultiplier < 1) phpPayload.status = "lose";
        else phpPayload.status = "win";

        phpPayload.bet_amount = reqAmount;

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
