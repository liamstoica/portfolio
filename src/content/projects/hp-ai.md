# HP AI Assistant

A locally hosted, privacy-first AI assistant built for an HP executive to streamline workflows, summarize internal data, and accelerate decision-making.

## Overview
This project began as a simple Figma UI request and evolved into a full AI product build. In 8 weeks, a two-person team designed, coded, and shipped a secure, locally hosted AI assistant running on an HP Z-box. The tool provides fast access to internal knowledge, summarizes files, mirrors the executive’s communication tone, and operates entirely offline to meet strict HP security requirements.

## Key Responsibilities
• Led UX/UI design, prototyping, user testing, and product behavior  
• “Vibe-coded” the front-end directly in Replit using HTML/CSS/JS  
• Designed chat architecture, output formats, and UI flows  
• Built and tuned prompts, temperature settings, and agent behavior  
• Helped architect dual knowledge bases: conversational + system-wide  
• Balanced design precision with real coding constraints inside a firewall  

## Strategy
Three core pillars guided the project:

1. **Design + Build at the Same Time**  
Traditional handoff wasn’t viable. Prototyping and coding simultaneously enabled instant testing of tone, model behavior, and UI interactions.

2. **Local, Private, and Fast**  
Every part of the tool — models, files, embeddings — needed to stay inside HP’s infrastructure. Ollama + Llama 3.2 created a secure, fully offline environment.

3. **One Assistant, Many Jobs**  
The assistant needed to summarize meetings, draft communications, retrieve cross-department knowledge, and respond in the executive’s own style.

## Challenges
• HP’s firewall blocked nearly all cloud AI tools (ChatGPT, Claude, Gemini)  
• Replit “vibe-coding” had instability, limited backend support, and fragile prompts  
• Switching tools mid-project (CoPilot → Ollama) required rapid adaptation  
• Needed extremely precise prompting to avoid memory spikes or tool crashes  

## Outcomes
• 1 locally hosted AI assistant built end-to-end  
• 100% alignment with HP security and compliance  
• 8-week turnaround from concept to working product  
• 5× faster access to internal documents and summaries  
• A customizable base for future team-wide AI agents  

## Key Learnings
Designing while coding inside strict security constraints forces clarity and precision. High-impact prompting mattered as much as UI or system design. Early prompt t
