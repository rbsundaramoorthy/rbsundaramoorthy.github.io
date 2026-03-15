---
title: "Building a CLI That Thinks Differently"
category: "Side Project"
tag: "Engineering"
date: 2026-03-08
readTime: "8 min"
excerpt: "What happens when you design developer tools with the assumption that the user is brilliant but busy? A weekend experiment turned ongoing obsession."
---

Most command-line tools are designed with an implicit assumption: the user will read the documentation. They won't. They'll type the command, get an error, swear quietly, and then Google it. I wanted to build something that assumed the opposite — that the user is brilliant but has exactly zero patience for figuring out flag syntax.

The experiment started on a Saturday morning with a simple question: what if a CLI could infer intent? Not through AI in the buzzword sense, but through careful observation of patterns. If someone types `deploy staging` after running `test --all` three times, maybe they want to deploy to staging only after all tests pass. The tool should suggest that workflow, not force the user to write a shell script.

I built the first prototype in Rust, partly because I wanted the speed and partly because Rust's type system forces you to think about edge cases before they become bugs. The core idea was a "context stack" — the tool remembers your last N commands and uses them to suggest completions, flags, and even entire workflows. It's not machine learning. It's pattern matching with a good memory.

Three weeks in, something unexpected happened. I started using it for my own work, and I noticed that the tool was teaching me things about my own habits. I always ran the same three commands before deploying. I always forgot the `--verbose` flag on debug builds. The CLI became a mirror, and the reflection was surprisingly useful. The project is still rough — the config format needs work, and the suggestion engine is too aggressive — but that roughness is part of what makes it interesting. Perfection would have killed the exploration.
