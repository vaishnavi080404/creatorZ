"use client";

import { useState } from "react";
import { MOCK_OFFERS } from "@/lib/mockData";
import StructuredOfferCard from "@/components/negotiation/StructuredOfferCard";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Send, ShieldCheck } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "brand" | "creator";
  senderName: string;
  text?: string;
  isOffer?: boolean;
  time: string;
}

export default function CreatorOffersPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "brand",
      senderName: "Prime Beverages India",
      text: "Hey Alex! Loved your Pitch Reel hook about the student energy crash test. We'd love to lock you in for our blitz launch.",
      time: "10:28 AM"
    },
    {
      id: "m-2",
      sender: "brand",
      senderName: "Prime Beverages India",
      isOffer: true,
      time: "10:30 AM"
    }
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "creator",
      senderName: "Alex Kumar",
      text: inputMessage.trim(),
      time: "Just now"
    };

    setMessages([...messages, newMsg]);
    setInputMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      <div className="flex items-center justify-between">
        <Link
          href="/creator/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C635B] hover:text-[#181314]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Creator Dashboard</span>
        </Link>
      </div>

      <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E8DEC8] bg-[#FAF6EE] p-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7A1C28] uppercase">
            <MessageSquare className="w-4 h-4" />
            <span>Brand Inquiries & Offers</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border-l-4 border-[#7A1C28] shadow-sm cursor-pointer space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#181314]">Prime Beverages India</h4>
              <span className="text-[10px] text-[#6C635B] font-mono">10:30 AM</span>
            </div>
            <p className="text-[11px] text-[#7A1C28] font-bold font-mono">⚡ Offer Pending (₹35,000 + GST)</p>
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          <div className="p-4 border-b border-[#E8DEC8] bg-[#FAF6EE]/50 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#181314]">Prime Beverages India Pvt Ltd</h3>
              <p className="text-[10px] text-[#166534]">Verified Brand • Contract Ready</p>
            </div>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[480px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "creator" ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] font-mono text-[#6C635B] mb-1 px-1">
                  {msg.senderName} • {msg.time}
                </span>

                {msg.isOffer ? (
                  <div className="w-full my-2">
                    <StructuredOfferCard offer={MOCK_OFFERS[0]} />
                  </div>
                ) : (
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "creator"
                        ? "bg-[#7A1C28] text-white rounded-tr-none shadow-sm"
                        : "bg-[#FAF6EE] text-[#181314] border border-[#E8DEC8] rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E8DEC8] bg-[#FAF6EE] flex items-center gap-3">
            <input
              type="text"
              placeholder="Reply to brand or request term modifications..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 text-xs p-3 rounded-xl border border-[#E8DEC8] bg-white text-[#181314] focus:outline-none focus:border-[#7A1C28]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#7A1C28] hover:bg-[#63141E] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
