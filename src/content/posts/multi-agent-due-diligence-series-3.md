---
title: "The Score That Makes You Stop Looking: Per-Claim Confidence in Production AI Agents"
category: "Deep Dive"
tag: "Agentic AI"
date: 2026-06-19
readTime: "4 min"
excerpt: "A 92 percent confidence score is not 92 percent true. It is a number that makes you stop looking — and a single headline score is exactly where the instinct to look polished does the most damage."
series: "Multi-Agent Due Diligence Analyst"
seriesPart: 3
---

A 92 percent confidence score is not 92 percent true. It is a number that makes you stop looking.

This is Gate #3 of the ten an AI agent has to clear before it belongs near a regulated decision. Post #1 argued the polished demo scores about 2 out of 10 on what production needs. Post #2 was the first gate, provenance: every claim knowing where it came from. This one is the question provenance unlocks. Once you know where a claim came from, how sure are you of it, one claim at a time?

Start with the failure it prevents.

A while back one of my agents handed me a due-diligence report with that 92 percent on top. It looked authoritative, so I traced it. Nearly half the sources underneath were unknown and untraceable, and the single score had averaged the claims I should have trusted least together with the ones I could stand behind. An average is the one value most likely to be wrong about the claim that matters most. The headline says 92, you relax, and you relax right over the line that was a guess.

So stop scoring the report and start scoring the claim. Every finding carries its own confidence, and that confidence comes from the evidence behind it, not from how fluent the sentence reads. A revenue figure from a regulatory filing can be high. The same figure from an unnamed blog cannot, however confidently the model phrases it. Tie confidence to the tier of the source and a guess can no longer borrow the authority of a fact.

The half I am still working on is the harder one, and I would rather name it than imply it is finished. What I just described is bounding — confidence capped by the quality of the evidence. That is not calibration. Calibration means proving the claims I mark medium come out right about seven times in ten, which takes measuring predictions against real outcomes, and I have not done that yet. The system bounds confidence by evidence today. The calibration work is open.

None of these gates stands alone. You cannot trust a confidence score until you know where each claim came from, and you cannot trace that until the system records what it did. Audit trail holds up provenance, provenance holds up per-claim confidence.

The throughline of the series is one sentence. A demo optimizes for looking right, and a single confident number is where that instinct does the most damage, because it looks like rigor while quietly taking away the reader's reason to check. The fix is never a more confident number. It is a smaller, truer one, attached to the single claim a person has to act on.

---

*Next: Gate #4, how an agent behaves when it fails. Building this in the open — notes and code in the [GitHub repository](https://github.com/rbsundaramoorthy/agentic-due-diligence).*

![Fluency is not confidence](/images/fluency_is_not_confidence_stacked.png)
