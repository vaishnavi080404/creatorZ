"use client";
import React, { useState } from 'react';
export const Accordion = ({ items, className }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (<div className={className}>
      {items.map((item, idx) => (<div key={idx} className="border-b border-primary/20">
          <button type="button" onClick={() => toggle(idx)} className="w-full text-left py-4 flex justify-between items-center text-primary font-medium">
            <span>{item.header}</span>
            <span>{openIndex === idx ? '−' : '+'}</span>
          </button>
          {openIndex === idx && (<div className="pb-4 text-secondary">
              {item.content}
            </div>)}
        </div>))}
    </div>);
};
