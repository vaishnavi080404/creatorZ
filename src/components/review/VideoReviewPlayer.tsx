"use client";

import { useState, useRef } from "react";
import { VideoDraft, VideoTimestampPin } from "@/lib/types";
import { Play, Pause, MessageSquare, Check, Plus, Clock, FileVideo, ShieldCheck } from "lucide-react";

interface VideoReviewPlayerProps {
  drafts: VideoDraft[];
  campaignTitle: string;
  onApproveFinal?: () => void;
}

export default function VideoReviewPlayer({
  drafts,
  campaignTitle,
  onApproveFinal
}: VideoReviewPlayerProps) {
  const [activeVersionIndex, setActiveVersionIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [pins, setPins] = useState<VideoTimestampPin[]>(drafts[0]?.pins || []);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [showAddComment, setShowAddComment] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentDraft = drafts[activeVersionIndex] || drafts[0];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const jumpToTimestamp = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = sec;
    setCurrentTime(sec);
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleAddPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newPin: VideoTimestampPin = {
      id: `pin-${Date.now()}`,
      timestampSec: Math.floor(currentTime),
      authorName: "Brand Marketing Lead",
      authorRole: "Brand",
      comment: newCommentText.trim(),
      resolved: false,
      createdAt: "Just now"
    };

    setPins([...pins, newPin]);
    setNewCommentText("");
    setShowAddComment(false);
  };

  const togglePinResolved = (pinId: string) => {
    setPins(
      pins.map((p) => (p.id === pinId ? { ...p, resolved: !p.resolved } : p))
    );
  };

  const formatSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-white border border-[#E8DEC8] rounded-2xl overflow-hidden shadow-sm">
      
      {/* Top Header & Version Bar */}
      <div className="p-5 border-b border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EE]">
        <div>
          <div className="flex items-center gap-2">
            <FileVideo className="w-4 h-4 text-[#7A1C28]" />
            <h3 className="text-sm font-bold text-[#181314] font-heading">
              In-Platform Video Review Studio
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-white border border-[#E8DEC8] text-[#7A1C28]">
              {pins.filter(p => !p.resolved).length} Pending Changes
            </span>
          </div>
          <p className="text-xs text-[#6C635B] mt-0.5">
            Click on video timeline to add revision notes at exact seconds.
          </p>
        </div>

        {/* Version Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white border border-[#E8DEC8]">
          {drafts.map((d, index) => (
            <button
              key={d.id}
              onClick={() => {
                setActiveVersionIndex(index);
                setPins(d.pins);
              }}
              className={`px-3 py-1 rounded text-xs font-semibold font-mono transition-all ${
                activeVersionIndex === index
                  ? "bg-[#7A1C28] text-white shadow-sm"
                  : "text-[#6C635B] hover:text-[#181314]"
              }`}
            >
              Draft {d.version}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace (Video Player + Timestamp Pin Drawer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT: Video Player (7 Cols) */}
        <div className="lg:col-span-7 bg-black p-4 flex flex-col justify-between">
          <div className="relative aspect-[9/16] max-h-[480px] mx-auto bg-zinc-950 rounded-xl overflow-hidden group">
            <video
              ref={videoRef}
              src={currentDraft.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Floating Play/Pause Indicator */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-white/90 text-[#7A1C28] flex items-center justify-center shadow-xl">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Custom Timeline with Pinned Markers */}
          <div className="mt-4 space-y-2 text-white">
            
            {/* Timeline Scrub Bar with Pinned Dots */}
            <div className="relative h-4 flex items-center cursor-pointer">
              
              {/* Background Track */}
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden relative">
                <div
                  className="h-full bg-[#7A1C28] transition-all"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                ></div>
              </div>

              {/* Pin Markers on the Track */}
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpToTimestamp(pin.timestampSec);
                  }}
                  title={`Jump to ${formatSec(pin.timestampSec)}: ${pin.comment}`}
                  style={{ left: `${(pin.timestampSec / (duration || 1)) * 100}%` }}
                  className={`absolute w-3.5 h-3.5 -top-0.5 -ml-1.5 rounded-full border-2 border-white shadow-md transition-transform hover:scale-150 ${
                    pin.resolved ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                  }`}
                />
              ))}
            </div>

            {/* Playback Controls & Timestamp */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span>
                  {formatSec(currentTime)} / {formatSec(duration)}
                </span>
              </div>

              <button
                onClick={() => {
                  if (videoRef.current) videoRef.current.pause();
                  setIsPlaying(false);
                  setShowAddComment(true);
                }}
                className="px-3 py-1 rounded bg-[#7A1C28] hover:bg-[#63141E] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pin Note at {formatSec(currentTime)}</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: Timestamp Pins & Revision Requests (5 Cols) */}
        <div className="lg:col-span-5 p-5 bg-white border-t lg:border-t-0 lg:border-l border-[#E8DEC8] flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E8D8]">
              <span className="text-xs font-bold font-mono uppercase text-[#181314]">
                Timestamped Feedback ({pins.length})
              </span>
              <span className="text-[11px] text-[#6C635B] font-mono">
                Uploaded: {currentDraft.uploadedAt}
              </span>
            </div>

            {/* Add Pin Form */}
            {showAddComment && (
              <form onSubmit={handleAddPin} className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8DEC8] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#7A1C28]">
                    Pin at timestamp: {formatSec(currentTime)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddComment(false)}
                    className="text-xs text-[#6C635B] hover:text-black"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="e.g. Please brighten product label and adjust music volume..."
                  rows={2}
                  className="w-full text-xs p-2 rounded border border-[#E8DEC8] bg-white text-[#181314] focus:outline-none"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddComment(false)}
                    className="text-xs px-3 py-1 rounded border border-[#D8CEBD] text-[#6C635B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs px-3 py-1 rounded bg-[#7A1C28] text-white font-bold"
                  >
                    Save Pin
                  </button>
                </div>
              </form>
            )}

            {/* List of Pinned Comments */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    pin.resolved
                      ? "bg-[#FAF6EE]/60 border-[#E8DEC8] opacity-75"
                      : "bg-[#FAF6EE] border-[#E8DEC8]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <button
                      onClick={() => jumpToTimestamp(pin.timestampSec)}
                      className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-[#7A1C28] text-white hover:bg-[#63141E] flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{formatSec(pin.timestampSec)}</span>
                    </button>

                    <button
                      onClick={() => togglePinResolved(pin.id)}
                      className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-0.5 rounded border transition ${
                        pin.resolved
                          ? "bg-[#EBF7EE] text-[#166534] border-[#C6E7CE]"
                          : "bg-white text-[#6C635B] border-[#D8CEBD] hover:bg-[#FAF6EE]"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{pin.resolved ? "Resolved" : "Mark Resolved"}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#181314] leading-relaxed">
                    {pin.comment}
                  </p>
                  
                  <div className="mt-2 text-[10px] text-[#6C635B] flex items-center justify-between">
                    <span>By: {pin.authorName}</span>
                    <span>{pin.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Approval & Milestone Payout Action */}
          <div className="pt-4 border-t border-[#F0E8D8] space-y-2">
            <button
              onClick={onApproveFinal}
              className="w-full py-3 rounded-xl bg-[#166534] hover:bg-[#14532D] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 transform active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Approve Final Cut & Confirm Milestone Payout</span>
            </button>
            <p className="text-[10px] text-center text-[#6C635B]">
              Final approval confirms milestone completion and writes deliverable to their verified portfolio.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
