// Firebase Functions - כל הפונקציות לניהול הנתונים
import { database, ref, set, push, onValue, update } from './firebase-config.js';

// ========== USER MANAGEMENT ==========

// Save user profile
export function saveUserProfile(user) {
    const userRef = ref(database, 'users/' + user.nickname);
    return set(userRef, {
        nickname: user.nickname,
        avatar: user.avatar,
        points: user.points || 0,
        lastSeen: Date.now()
    });
}

// Get all users (for leaderboard)
export function getAllUsers(callback) {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
        const users = [];
        snapshot.forEach((childSnapshot) => {
            users.push(childSnapshot.val());
        });
        callback(users);
    });
}

// Update user points
export function updateUserPoints(nickname, points) {
    const userRef = ref(database, 'users/' + nickname);
    return update(userRef, {
        points: points,
        lastUpdated: Date.now()
    });
}

// ========== TIKTOK RECOMMENDATIONS ==========

// Add TikTok recommendation
export function addTikTokRecommendation(recommendation) {
    const tiktoksRef = ref(database, 'tiktoks');
    return push(tiktoksRef, {
        ...recommendation,
        timestamp: Date.now()
    });
}

// Get all TikTok recommendations
export function getAllTikToks(callback) {
    const tiktoksRef = ref(database, 'tiktoks');
    onValue(tiktoksRef, (snapshot) => {
        const tiktoks = [];
        snapshot.forEach((childSnapshot) => {
            tiktoks.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        // Sort by timestamp (newest first)
        tiktoks.sort((a, b) => b.timestamp - a.timestamp);
        callback(tiktoks);
    });
}

// ========== VOTES ==========

// Save vote
export function saveVote(category, option, user) {
    const voteRef = ref(database, `votes/${category}/${user.nickname}`);
    return set(voteRef, {
        option: option,
        user: user.nickname,
        avatar: user.avatar,
        timestamp: Date.now()
    });
}

// Get all votes for a category
export function getVotes(category, callback) {
    const votesRef = ref(database, `votes/${category}`);
    onValue(votesRef, (snapshot) => {
        const votes = {};
        snapshot.forEach((childSnapshot) => {
            const vote = childSnapshot.val();
            votes[childSnapshot.key] = vote;
        });
        callback(votes);
    });
}

// ========== CHALLENGES ==========

// Submit challenge completion
export function submitChallenge(challengeData) {
    const challengesRef = ref(database, 'challenges');
    return push(challengesRef, {
        ...challengeData,
        timestamp: Date.now()
    });
}

// Get all completed challenges
export function getAllChallenges(callback) {
    const challengesRef = ref(database, 'challenges');
    onValue(challengesRef, (snapshot) => {
        const challenges = [];
        snapshot.forEach((childSnapshot) => {
            challenges.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        // Sort by timestamp (newest first)
        challenges.sort((a, b) => b.timestamp - a.timestamp);
        callback(challenges);
    });
}

// ========== HELPER FUNCTIONS ==========

// Check if Firebase is connected
export function checkConnection(callback) {
    const connectedRef = ref(database, '.info/connected');
    onValue(connectedRef, (snapshot) => {
        callback(snapshot.val() === true);
    });
}

// Initialize data structure (run once)
export function initializeDatabase() {
    const initRef = ref(database, 'initialized');
    set(initRef, {
        created: Date.now(),
        version: '1.0.0'
    });
}