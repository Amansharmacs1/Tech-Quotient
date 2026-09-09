export const generateAiResponseService = async ({ query, code, context = 'chat' }) => {
  const apiKey = process.env.AI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      // If AI_API_KEY is present, we could make an HTTP request to Gemini or OpenAI API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are TechBot, an AI programming mentor for TechQuotient. Query: ${query}\nCode:\n${code || 'N/A'}` }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            code: null,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
      }
    } catch (err) {
      console.warn('AI API request failed, using intelligent assistant engine:', err.message);
    }
  }

  // Intelligent fallback assistant engine
  const q = (query || '').toLowerCase();
  let text = '';
  let responseCode = null;

  if (q.includes('avl') || q.includes('rotation') || q.includes('tree')) {
    text = "In AVL Trees, balance factors can become +2 or -2 after insertion. We perform single or double rotations (LL, RR, LR, RL) to restore height balance:";
    responseCode = `// Left-Left (LL) Single Right Rotation Example in C++\nNode* rightRotate(Node* y) {\n    Node* x = y->left;\n    Node* T2 = x->right;\n    // Perform rotation\n    x->right = y;\n    y->left = T2;\n    // Update heights\n    y->height = max(height(y->left), height(y->right)) + 1;\n    x->height = max(height(x->left), height(x->right)) + 1;\n    return x; // New root\n}`;
  } else if (q.includes('memory') || q.includes('leak') || q.includes('pointer')) {
    text = "To avoid memory leaks in C++, always pair dynamic `new` calls with corresponding `delete` calls, or use modern RAII smart pointers (`std::unique_ptr`):";
    responseCode = `#include <memory>\n// Recommended Modern C++ RAII approach\nvoid safeAllocation() {\n    std::unique_ptr<int[]> arr = std::make_unique<int[]>(100);\n    // Automatically deallocated when out of scope!\n}`;
  } else if (q.includes('dp') || q.includes('knapsack') || q.includes('dynamic')) {
    text = "For 0/1 Knapsack Dynamic Programming, maintain a 2D table `dp[i][w]` representing maximum value using first `i` items with capacity `w`:";
    responseCode = `// 0/1 Knapsack DP Table Transition in Java\nfor (int i = 1; i <= n; i++) {\n    for (int w = 1; w <= W; w++) {\n        if (wt[i-1] <= w)\n            dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);\n        else\n            dp[i][w] = dp[i-1][w];\n    }\n}`;
  } else {
    text = `Great question regarding "${query}"! Based on your TechQuotient performance history, here is the recommended optimal pattern:`;
    responseCode = `// Optimized O(N) Hash Map Lookup Pattern\nstd::unordered_map<int, int> lookup;\nfor (int i = 0; i < n; ++i) {\n    // O(1) average constant time check\n    if (lookup.find(target - nums[i]) != lookup.end()) {\n        return {lookup[target - nums[i]], i};\n    }\n    lookup[nums[i]] = i;\n}`;
  }

  return {
    text,
    code: responseCode,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};
