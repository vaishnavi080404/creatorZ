"use client";

import { useState } from "react";
import { MOCK_OFFERS, MOCK_CREATORS } from "@/lib/mockData";
import StructuredOfferCard from "@/components/negotiation/StructuredOfferCard";
import { MessageSquare, Send, ShieldCheck, CheckCircle2, Paperclip, MoreVertical } from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "brand" | "creator";
  senderName: string;
  text?: string;
  isOffer?: boolean;
  time: string;
}

export default function MessagesNegotiationPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "brand",
      senderName: "Prime India Marketing",
      text: "Hey Alex! We loved your audition pitch for the energy crash test angle. We would like to officially lock this in for our upcoming launch.",
      time: "10:28 AM"
    },
    {
      id: "m-2",
      sender: "brand",
      senderName: "Prime India Marketing",
      isOffer: true,
      time: "10:30 AM"
    },
    {
      id: "m-3",
      sender: "creator",
      senderName: "Alex Kumar",
      text: "Sounds great! Reviewing the terms and GST breakdown now.",
      time: "10:34 AM"
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
      
      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8DEC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7A1C28] uppercase mb-0.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Commercial Negotiation Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-[#181314] font-heading">
            Direct In-Chat Offers & Agreements
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/campaigns/ord-8492/room"
            className="text-xs font-bold px-4 py-2 rounded-full bg-[#FAF6EE] hover:bg-[#F2EAE0] border border-[#E8DEC8] text-[#7A1C28]"
          >
            Go to Campaign Order Room →
          </Link>
        </div>
      </div>

      {/* 2-Column Chat Interface */}
      <div className="bg-white border border-[#E8DEC8] rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* LEFT: Conversation Threads Sidebar (4 Cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#E8DEC8] bg-[#FAF6EE] flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-[#E8DEC8]">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full text-xs px-3.5 py-2 rounded-xl bg-white border border-[#E8DEC8] text-[#181314] focus:outline-none"
              />
            </div>

            <div className="divide-y divide-[#E8DEC8]">
              
              {/* Active Conversation Item */}
              <div className="p-4 bg-white border-l-4 border-[#7A1C28] cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&auto=format&fit=crop&q=80"
                      alt="Prime India"
                      className="w-10 h-10 rounded-xl object-cover border border-[#E8DEC8]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#181314]">Prime Beverages India</h4>
                      <p className="text-[11px] text-[#7A1C28] font-bold font-mono">⚡ Offer Pending (₹35,000)</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6C635B] font-mono">10:34 AM</span>
                </div>
              </div>

              {/* Other Conversations */}
              <div className="p-4 hover:bg-white/60 transition cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&auto=format&fit=crop&q=80"
                      alt="BeastLife"
                      className="w-10 h-10 rounded-xl object-cover border border-[#E8DEC8]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#181314]">BeastLife Nutrition</h4>
                      <p className="text-[11px] text-[#166534] font-medium">✓ Order Room Active (Stage 3)</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6C635B] font-mono">Yesterday</span>
                </div>
              </div>

              <div className="p-4 hover:bg-white/60 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&auto=format&fit=crop&q=80"
                    alt="Boat Audio"
                    className="w-10 h-10 rounded-xl object-cover border border-[#E8DEC8]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#181314]">Boat Audio India</h4>
                    <p className="text-[11px] text-[#6C635B]">Completed Payout (₹35,000)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 border-t border-[#E8DEC8] bg-white text-[11px] text-[#6C635B] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#166534]" />
            <span>Contract agreement enforced on offer acceptance.</span>
          </div>
        </div>

        {/* RIGHT: Active Chat & Interactive Offer Card (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF6EE]/50">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&auto=format&fit=crop&q=80"
                alt="Prime India"
                className="w-9 h-9 rounded-xl object-cover border border-[#E8DEC8]"
              />
              <div>
                <h3 className="text-xs font-bold text-[#181314]">Prime Beverages India Pvt Ltd</h3>
                <p className="text-[10px] text-[#166534] font-medium">Verified Brand Partner • Response in &lt;15 mins</p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-[#6C635B] bg-white border border-[#E8DEC8] px-2.5 py-1 rounded-md">
              Campaign: Student Blitz
            </span>
          </div>

          {/* Messages Stream */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[500px]">
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

          {/* Chat Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E8DEC8] bg-[#FAF6EE] flex items-center gap-3">
            <input
              type="text"
              placeholder="Type message or discuss deliverable terms..."
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
