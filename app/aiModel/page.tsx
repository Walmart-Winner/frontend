"use client"
import React, { useState, useEffect } from 'react';
import { Send, Bot, TrendingUp, AlertTriangle, Package, MapPin, Calendar, Zap, Store, Users, ShoppingCart } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
}

interface Insight {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'success';
}

const WalmartAIDashboard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m PulseBot. I can assist you in managing store operations, inventory management, and sales insights. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const dummyQuestions = [
    "Which store has most urgent orders today?",
    "What items will likely go out of stock this week?",
    "Show me trending products",
    "Weather-based demand predictions"
  ];

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Winter Apparel - Delhi NCR',
      description: 'Cold wave: 340% increase in jacket sales expected.',
      impact: '+₹2.4M',
      urgency: 'high',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Festival Bundle - Diwali',
      description: 'Bundle: Sweets + Decorations + Gifts.',
      impact: '+₹1.8M',
      urgency: 'medium',
      icon: <Package className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Fitness Gear - Mumbai',
      description: 'Viral trend by @FitWithShraddha.',
      impact: '+₹890K',
      urgency: 'high',
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'Gaming - Bangalore',
      description: 'Gaming peripherals running low.',
      impact: 'Prevent stockout',
      urgency: 'high',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      id: '5',
      title: 'Monsoon Gear - Kerala',
      description: 'Heavy rain forecast this week.',
      impact: '+₹650K',
      urgency: 'medium',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: '6',
      title: 'Electronics - Chennai',
      description: 'AC demand surge due to heat wave.',
      impact: '+₹1.2M',
      urgency: 'high',
      icon: <Zap className="w-4 h-4" />
    }
  ];

  const insights: Insight[] = [
    {
      id: '1',
      message: 'Critical stock alert - Milk expires in 2 days (47 units)',
      type: 'warning'
    },
    {
      id: '2',
      message: 'Predicted stockout - Winter jackets (3 days remaining)',
      type: 'warning'
    },
    {
      id: '3',
      message: 'Reorder threshold reached - Gaming accessories (12% left)',
      type: 'info'
    },
    {
      id: '4',
      message: 'Overstocked alert - ACs (45 days supply)',
      type: 'success'
    },
    {
      id: '5',
      message: 'Fast-moving alert - Protein powders (sold 89% in 2 days)',
      type: 'success'
    },
    {
      id: '6',
      message: 'Emergency restock needed - Umbrellas (only 3 units left)',
      type: 'warning'
    },
    {
      id: '7',
      message: 'Demand spike prediction - Festival sweets (next 48 hours)',
      type: 'info'
    }
  ];

  const simulateAPICall = async (question: string): Promise<string> => {
    const responses: { [key: string]: string } = {
      "Which store has most urgent orders today?": "**Mumbai Central Store (WM-MUM-001)** - 47 urgent orders. **Delhi CP Store (WM-DEL-003)** - 34 urgent orders. Peak categories: Electronics, Groceries, Home & Kitchen.",
      "What items will likely go out of stock this week?": "**High-risk items:** Delhi - Winter jackets (78% depleted), Mumbai - Diwali sweets (82% depleted), Bangalore - Gaming laptops (89% depleted), Kerala - Umbrellas (91% depleted).",
      "Show me trending products": "**Top trending:** iPhone 15 (+89%), Gaming chairs (+156%), Smart TVs (+67%), Heaters (+234%), Bluetooth speakers (+89%).",
      "Weather-based demand predictions": "**North India:** +200% winter wear, **South India:** +150% umbrellas, **West India:** +80% outdoor equipment, **East India:** steady demand."
    };

    await new Promise(resolve => setTimeout(resolve, 1200));
    return responses[question] || "Analyzing store data across all Walmart locations for your specific query.";
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await simulateAPICall(textToSend);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('API call failed:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-50 border-l-4 border-red-400 text-red-800';
      case 'info': return 'bg-blue-50 border-l-4 border-blue-400 text-blue-800';
      case 'success': return 'bg-green-50 border-l-4 border-green-400 text-green-800';
      default: return 'bg-gray-50 border-l-4 border-gray-400 text-gray-800';
    }
  };

  const formatMessageText = (text: string) => {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
    return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className=" text-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800">Chat with PulseBot</h1>
            <p className="text-blue-800 text-sm">Intelligent insights for smarter retail decisions</p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              {/* <Store className="w-4 h-4 mr-1 text-blue-700" /> */}
              {/* <span className=' text-blue-800'>347 Stores</span> */}
            </div>
            <div className="flex items-center">
              {/* <Users className="w-4 h-4 mr-1 text-blue-800" />
              <span className=' text-blue-800'>Live</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 flex flex-col">
            <div className="flex items-center p-4 border-b border-gray-100">
              <Bot className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">AI Store Assistant</h2>
            </div>

            {/* Quick Questions */}
            <div className="p-4 bg-yellow-50 border-b border-yellow-200">
              <div className="flex flex-wrap gap-2">
                {dummyQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-800'
                    }`}
                  >
                    {message.sender === 'ai' ? formatMessageText(message.text) : message.text}
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm">
                    AI is analyzing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about store operations..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 space-y-4">
          {/* AI Recommendations */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center p-4 border-b border-gray-100">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <h2 className="text-sm font-semibold text-gray-800">AI Recommendations</h2>
            </div>
            <div className="h-64 overflow-y-auto p-2">
              <div className="space-y-2">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-800 text-xs">{rec.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getUrgencyColor(rec.urgency)}`}>
                        {rec.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-xs font-medium text-green-600">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-Summary Insights */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center p-4 border-b border-gray-100">
              <AlertTriangle className="w-4 h-4 text-blue-600 mr-2" />
              <h2 className="text-sm font-semibold text-gray-800">Auto-Summary Insights</h2>
            </div>
            <div className="h-72 overflow-y-auto p-2">
              <div className="space-y-2">
                {insights.map((insight) => (
                  <div key={insight.id} className={`rounded-lg p-3 ${getInsightColor(insight.type)}`}>
                    <p className="text-xs font-medium">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default WalmartAIDashboard;